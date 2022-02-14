import { Card } from 'react-bootstrap';
import CreatePostForm from 'components/forms/CreatePostForm';
import { useState, useEffect } from 'react';
import axiosClient from 'axiosSetup';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import NFT from 'contracts/NFT.json';
import { client as ipfsClient } from 'app/ipfs';
import { checkImageStatus, checkCaptionStatus } from 'temp';
import { getKeyByValue, getPrimaryWallet } from 'helpers';
import { localWeb3 as web3, magicLocal } from 'app/magic';
import InvolveModal from 'components/modal/InvolveModal';
import { useNotification } from 'app/notificationContext';

const nftAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const petDetectionAPI = process.env.NEXT_PUBLIC_DETECTION_API;
const petNLPAPI = process.env.NEXT_PUBLIC_NLP_API;

const STATUS = {
  allowed: 1,
  warning: 2,
  denied: 3,
};

const CreatePost = ({ content, isEdit = false }) => {
  const { mutate } = useSWRConfig();
  const { showMessage } = useNotification();
  const router = useRouter();

  const [loaded, setLoaded] = useState(-1);
  const [isMint, setIsMint] = useState(router.query.is_mint || false);
  const [showInvolve, setShowInvolve] = useState(false);
  const [url, setUrl] = useState('');
  const [contract, setContract] = useState('');
  const [chosen, setChosen] = useState('');
  const [involve, setInvolve] = useState({});

  useEffect(() => {
    let mounted = true;
    const getChosenWallet = () => {
      try {
        let { chosen } = getPrimaryWallet('asset');
        if (mounted) {
          console.log('aa', chosen);
          setChosen(chosen);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChosenWallet();
    return () => (mounted = false);
  }, []);

  const handleUpload = (action) => async (data, setErrors, errors) => {
    let bodyFormData = new FormData();

    bodyFormData.append('image', data.image.file);
    bodyFormData.append('caption', data.caption);
    // Mentions
    const mentionIds = data.mentions?.map((value) => value.value);
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
          `http://localhost:2005/text`,
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
          onUploadProgress: (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setLoaded(percentCompleted);
          },
        }
      );
    } catch (error) {
      // logging
      console.log(error);
    }
    if (result && result.data) {
      showMessage(
        {
          title: 'System',
          content: 'Post created successfully. Going to detail page',
        },
        3000,
        'success'
      );
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
        },
      });
      const url = `${process.env.NEXT_PUBLIC_IPFS_ROOT_URL}/${added.path}`;

      return url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const estimateGasMint = async (values, setErrors, errors) => {
    try {
      setLoaded(0);
      setShowInvolve(true);

      // Upload image
      const fileUrl = await uploadImageIPFS(values?.image?.file);

      if (!fileUrl || fileUrl === '') {
        return;
      }

      // Upload to IPFS // Apply a template
      const data = JSON.stringify({
        name: values.name,
        description: values.caption,
        image: fileUrl,
      });

      const added = await ipfsClient.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setUrl(url);

      let signer;
      let provider;
      console.log('bb', chosen);
      switch (chosen) {
        case 'metamask':
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          provider = new ethers.providers.Web3Provider(connection);
          signer = await provider.getSigner();
          break;
        default:
          provider = new ethers.providers.Web3Provider(magicLocal.rpcProvider);
          signer = await provider.getSigner();
          break;
      }
      console.log('ss', signer);

      let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
      setContract(contract);
      // Estimate gas and mint token
      const gas = await contract.estimateGas.createToken(url);

      const gasData = await signer.getFeeData();
      const gasFee =
        ethers.utils.formatEther(gasData.gasPrice.toString()) * gas.toNumber();

      setInvolve({
        'Estimated gas fee': gasFee,
        'Gas limit': gas.toString(),
        'Gas Price':
          ethers.utils.formatUnits(gasData.gasPrice.toString(), 'gwei') +
          ' gwei',
        'Max fee per gas':
          ethers.utils.formatUnits(gasData.maxFeePerGas.toString(), 'gwei') +
          ' gwei',
        total: gasFee,
      });
      console.log('fee', gasFee);
    } catch (error) {
      console.log(error);
      showMessage(
        {
          title: 'System',
          content: 'Unexpected error occur',
        },
        3000,
        'danger'
      );
    } finally {
      setLoaded(-1);
    }
  };
  const handleMint = async () => {
    try {
      setLoaded(50);
      setShowInvolve(false);
      showMessage(
        {
          title: 'System',
          content: 'Working...',
        },
        0,
        'info',
        true
      );
      let transaction = await contract.createToken(url);
      showMessage(
        {
          title: 'System',
          content: 'Token created successfully. Going to asset page',
        },
        3000,
        'success',
        false
      );
      router.push('/assets');
    } catch (error) {
      setLoaded(-1);
      showMessage(
        {
          title: 'System',
          content: error.message,
        },
        3000,
        'danger'
      );
    }
  };

  return (
    <Card className={`border-0 shadow-xss rounded-xxl`}>
      <Card.Body className='d-flex' style={{ margin: 20 }}>
        <CreatePostForm
          onSubmit={
            isMint ? estimateGasMint : handleUpload(isEdit ? 'put' : 'post')
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
          action={`Create token`}
        />
      </Card.Body>
    </Card>
  );
};

export default CreatePost;
