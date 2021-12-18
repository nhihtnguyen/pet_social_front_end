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
import { checkImageStatus } from 'temp';

const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' });

const STATUS = {
  allowed: 1,
  warning: 2,
  denied: 3,
};

const UploadImage = ({ content, onSubmit, isEdit }) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const [loaded, setLoaded] = useState(-1);

  const [status, setStatus] = useState('');
  const [isMint, setIsMint] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setImage(content.media_URL);
      setFile(content.media_URL);
      setCaption(content.caption);
    }
  }, [content]);

  const handleChange = (file, image) => {
    setFile(file);
    setImage(image);
    console.log('as', file, image);
  };

  const handleUpload = async (data, setErrors) => {
    console.log('datada', data);
    let bodyFormData = new FormData();

    bodyFormData.append('image', data.image.file);
    bodyFormData.append('caption', data.caption);
    // Mentions
    const mentionIds = data.mentions.map((value) => value.value);
    bodyFormData.append('mentions', mentionIds.join(','));

    let newForm = new FormData();
    newForm.append('file', data.image.file);
    newForm.append('model_choice', 'last');
    newForm.append('result_type', 'json');

    let result;
    try {
      result = await axiosClient.post('http://localhost:2000', newForm, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const result = checkImageStatus(result);
      setStatus(result);
      setErrors({ image: result });
    } catch (error) {
      // logging
      console.log(error);
    }

    //
    if (result === STATUS['denied']) {
      return;
    }

    try {
      result = await axiosClient.post(`/posts`, bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: function (progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percentCompleted);
          setLoaded(percentCompleted);
        },
      });
    } catch (error) {
      // logging
      console.log(error);
    }
    if (result) {
      console.log('result: ', result);
      mutate('/posts');
      router.push('/post/' + result.data.id);
    }
  };

  const handleEdit = async () => {
    var bodyFormData = new FormData();

    bodyFormData.append('image', file);
    bodyFormData.append('caption', caption);

    let newForm = new FormData();
    newForm.append('file', file);
    newForm.append('model_choice', 'last');
    newForm.append('result_type', 'json');

    let result;
    try {
      result = await axiosClient.post(`localhost:2000/`, newForm, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: function (progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log('Verify: ', percentCompleted);
          setLoaded(percentCompleted / 2);
        },
      });
      setStatus();
    } catch (err) {
      // logging
      console.log(error);
    }

    try {
      result = await axiosClient.put(
        `${serverHost}/posts/${content.id}`,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: function (progressEvent) {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted);
            setLoaded(percentCompleted / 2 + 50);
          },
        }
      );
    } catch (err) {
      // logging
      console.log(error);
    }
    if (result) {
      console.log('result: ', result);
      mutate('/posts');
      router.push('/post/' + result.data.id);
    }
  };

  const uploadImageIPFS = async () => {
    // Upload image
    try {
      console.log('inupload', file);
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      return url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const handleMintAndSell = async () => {
    // Upload image
    const fileUrl = await uploadImageIPFS();

    if (!name || !caption || !price || !fileUrl || fileUrl === '') {
      return;
    }

    // Upload to IPFS
    const data = JSON.stringify({
      name,
      description: caption,
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
      const priceParsed = ethers.utils.parseUnits(price, 'ether');

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
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const handleMint = async () => {};

  return (
    <Card className={`border-0 shadow-xss rounded-xxl`}>
      <Card.Body className='d-flex' style={{ margin: 20 }}>
        <CreatePostForm
          onSubmit={isEdit ? handleEdit : handleUpload}
          loaded={loaded}
        />
      </Card.Body>
    </Card>
  );
};

export default UploadImage;
