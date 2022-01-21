import { Card, Form } from 'react-bootstrap';
import CreatePostForm from 'components/forms/CreatePostForm';

import { useState, useEffect } from 'react';
import axiosClient from 'axiosSetup';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

import { ethers } from 'ethers';
import Web3Modal, { filterProviderChecks } from 'web3modal';
import { nftaddress, nftmarketaddress } from 'config';
import NFT from 'artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from 'artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { checkImageStatus, checkCaptionStatus } from 'temp';
import { getKeyByValue } from 'helpers';

const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' });

const STATUS = {
  allowed: 1,
  warning: 2,
  denied: 3,
};

const CreatePost = ({ content, onSubmit, isEdit }) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const [loaded, setLoaded] = useState(-1);
  const [isMint, setIsMint] = useState(false);

  const handleUpload = (action) => async (data, setErrors, errors) => {
    console.log('datada', data);
    let bodyFormData = new FormData();

    bodyFormData.append('image', data.image.file);
    bodyFormData.append('caption', data.caption);
    // Mentions
    const mentionIds = data.mentions.map((value) => value.value);
    bodyFormData.append('mentions', mentionIds.join(','));

    // Check image
    let imageStatus = STATUS['allowed'];
    if (
      action === 'post' ||
      (action === 'put' && data.image.file && data.image.file != '')
    ) {
      let newForm = new FormData();
      newForm.append('file', data.image.file);
      newForm.append('model_choice', 'last');
      newForm.append('result_type', 'json');

      try {
        imageStatus = await axiosClient.post('http://localhost:5000', newForm, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageStatus = checkImageStatus(imageStatus.data);
      } catch (error) {
        // logging
        console.log(error);
      }
    }
    // Check caption
    let captionStatus = STATUS['allowed'];
    try {
      captionStatus = checkCaptionStatus(data.caption);
      console.log('status caption', captionStatus, data.caption);
    } catch (error) {
      // logging
      console.log(error);
    }
    // Check caption 2
    if (
      data.caption &&
      captionStatus === STATUS['allowed'] &&
      data.caption.split(' ').length >= 4
    ) {
      try {
        let newForm = new FormData();
        newForm.append('text', data.caption);
        newForm.append('model_choice', 'model_1');
        captionStatus = await axiosClient.post(
          'http://localhost:5005/text',
          newForm,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        console.log('rr', captionStatus);
        captionStatus =
          Number(captionStatus.data['result']) === 1.0
            ? STATUS['allowed']
            : STATUS['warning'];
        console.log('rr2', captionStatus);
      } catch (error) {
        // logging
        console.log(error);
      }
    }
    // Set errors
    setErrors({
      ...errors,
      caption:
        captionStatus === STATUS['denied']
          ? 'Your caption content some words that are not allowed'
          : captionStatus === STATUS['warning']
          ? 'Your content should be related pet or animals'
          : '',
      image:
        imageStatus === STATUS['allowed']
          ? { type: 'valid', text: 'Allowed' }
          : imageStatus === STATUS['warning']
          ? {
              type: 'warning',
              text: 'Your image should be related pet or animals',
            }
          : { type: 'invalid', text: 'Your image is not allowed.' },
    });
    //
    if (
      imageStatus === STATUS['denied'] ||
      captionStatus === STATUS['denied'] ||
      captionStatus === STATUS['warning']
    ) {
      return;
    }
    bodyFormData.append('image_status', getKeyByValue(STATUS, imageStatus));
    bodyFormData.append('caption_status', getKeyByValue(STATUS, captionStatus));

    let result;
    try {
      result = await axiosClient[action](
        `/posts/${action === 'put' ? content?.id : ''}`,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: function (progressEvent) {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted);
            setLoaded(percentCompleted);
          },
        }
      );
    } catch (error) {
      // logging
      console.log(error);
    }
    if (result && result.data) {
      console.log('result: ', result);
      mutate('/posts');
      router.push('/post/' + result.data.id);
    }
  };

  const uploadImageIPFS = async (file) => {
    // Upload image
    try {
      const added = await client.add(file, {
        progress: (prog) => {
          setLoaded(prog / 3);
          console.log(`received: ${prog}`);
        },
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      return url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const handleMintAndSell = async (values, setErrors, errors) => {
    // Upload image
    console.log('Mint', values);
    const fileUrl = await uploadImageIPFS(values?.image?.file);

    if (
      !values.name ||
      !values.caption ||
      !values.price ||
      !fileUrl ||
      fileUrl === ''
    ) {
      return;
    }

    // Upload to IPFS
    const data = JSON.stringify({
      name: values.name,
      description: values.caption,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      // Create the item token
      let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
      let transaction = await contract.createToken(url);
      // After transaction
      let tx = await transaction.wait();
      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber();
      const priceParsed = ethers.utils.parseUnits(values.price, 'ether');

      // List the item for sale on the marketplace
      contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();

      transaction = await contract.createMarketItem(
        nftaddress,
        tokenId,
        priceParsed,
        { value: listingPrice }
      );
      await transaction.wait();

      router.push('/market');
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const handleMint = async () => {};

  return (
    <Card className={`border-0 shadow-xss rounded-xxl`}>
      <Card.Body className='d-flex' style={{ margin: 20 }}>
        <CreatePostForm
          onSubmit={
            isMint ? handleMintAndSell : handleUpload(isEdit ? 'put' : 'post')
          }
          loaded={loaded}
          values={content}
          isMint={isMint}
          setIsMint={setIsMint}
        />
      </Card.Body>
    </Card>
  );
};

export default CreatePost;
