import { Card, Form } from 'react-bootstrap';
import CreatePostForm from 'components/forms/CreatePostForm';

import { useState, useEffect } from 'react';
import axiosClient from 'axiosSetup';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { nftaddress, nftmarketaddress } from 'config';
import NFT from 'artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from 'artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { client as ipfsClient } from 'app/ipfs';
import { checkImageStatus, checkCaptionStatus } from 'temp';
import { getKeyByValue } from 'helpers';
import { localWeb3, magicLocal } from 'app/magic';
import InvolveCard from 'components/InvolveCard';
import { Modal } from 'react-bootstrap';
import Button from 'components/controls/Button';

const STATUS = {
  allowed: 1,
  warning: 2,
  denied: 3,
};

const InvolveModal = ({ show, handleClose, data, loading, onConfirm }) => (
  <Modal
    show={show}
    onHide={handleClose}
    backdrop='static'
    keyboard={false}
    contentClassName='bg-transparent p-0 m-0 border-0'
  >
    <InvolveCard data={data} loading={loading} />
    {!loading && (
      <div className='ms-auto mt-2'>
        <Button variant='danger' onClick={handleClose}>
          Reject
        </Button>{' '}
        <Button variant='primary' onClick={() => onConfirm()}>
          Confirm
        </Button>
      </div>
    )}
  </Modal>
);

const CreatePost = ({ content, onSubmit, isEdit }) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const [loaded, setLoaded] = useState(-1);
  const [isMint, setIsMint] = useState(false);
  const [showInvolve, setShowInvolve] = useState(false);
  const [involve, setInvolve] = useState({});
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const web3 = localWeb3();
  const [estimatedGas, setEstimatedGas] = useState('auto');

  const handleUpload = (action) => async (data, setErrors, errors) => {
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
        captionStatus =
          Number(captionStatus.data['result']) === 1.0
            ? STATUS['allowed']
            : STATUS['warning'];
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
      mutate('/posts');
      router.push('/post/' + result.data.id);
    }
  };

  const uploadImageIPFS = async (file) => {
    // Upload image
    try {
      const added = await ipfsClient.add(file, {
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
      const added = await ipfsClient.add(data);
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
      console.log('lometa', tx);
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
  const getEstimateGasFeeMintInvolve = async (values, setErrors, errors) => {
    try {
      setLoaded(0);
      setShowInvolve(true);
      setPrice(values.price);

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

      const added = await ipfsClient.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setUrl(url);

      const contract = new web3.eth.Contract(NFT.abi, nftaddress);
      console.log('estimate...');

      // Estimate gas and mint token
      let gas = await contract.methods.createToken(url).estimateGas();
      console.log('estimate...', gas);
      let gasPrice = await web3.eth.getGasPrice();
      console.log(gasPrice);
      setInvolve({
        'Estimated gas fee': web3.utils.fromWei(String(gas * gasPrice)),
      });
      setEstimatedGas(gas);
      setLoaded(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMint = async () => {
    try {
      setLoaded(99);
      setShowInvolve(false);
      const user = await magicLocal.user.getMetadata();
      const from = user.publicAddress;

      // Create the item token
      let contract = new web3.eth.Contract(NFT.abi, nftaddress);
      console.log('estimate...');
      // Estimate gas and mint token
      let gas = await contract.methods.createToken(url).estimateGas();
      console.log('estimate...', gas);

      // Show confirm modal
      console.log('gas', estimatedGas);
      let transaction = await contract.methods.createToken(url).send({
        from,
        gas: estimatedGas,
      });
      console.log('estimate...');

      // After transaction
      let tokenID = transaction.events['Transfer'].raw.topics[3];
      tokenID = web3.utils.hexToNumber(tokenID);
      const priceParsed = ethers.utils.parseUnits(price, 'ether');

      // List the item for sale on the marketplace
      contract = new web3.eth.Contract(NFTMarket.abi, nftmarketaddress);
      const listingPrice = await contract.methods.getListingPrice().call();
      gas = await contract.methods
        .createMarketItem(nftaddress, tokenID, priceParsed)
        .estimateGas({
          from,
          value: listingPrice,
        });
      console.log('estimate...');

      transaction = await contract.methods
        .createMarketItem(nftaddress, tokenID, priceParsed)
        .send({
          from,
          value: listingPrice,
          gas,
        });

      console.log('tx result: ', transaction);
      setLoaded(-1);
      router.push('/assets');
    } catch (error) {
      console.log(error);
      setLoaded(-1);
    }
  };

  return (
    <Card className={`border-0 shadow-xss rounded-xxl`}>
      <Card.Body className='d-flex' style={{ margin: 20 }}>
        <CreatePostForm
          onSubmit={
            isMint
              ? getEstimateGasFeeMintInvolve
              : handleUpload(isEdit ? 'put' : 'post')
          }
          loaded={loaded}
          values={content}
          isMint={isMint}
          setIsMint={setIsMint}
        />
        <InvolveModal
          show={showInvolve}
          handleClose={() => setShowInvolve(false)}
          data={involve}
          onConfirm={handleMint}
          loading={loaded > -1}
        />
      </Card.Body>
    </Card>
  );
};

export default CreatePost;
