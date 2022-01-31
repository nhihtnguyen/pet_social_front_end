import Layout from 'components/Layout';
import ItemCard from 'components/itemcard/ItemCard';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { marketActions, marketSelector } from 'features/market/marketSlice';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ItemDetail from 'components/itemdetail/ItemDetail';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import PageTitle from 'components/pagetitle/PageTitle';
import { FiPlus, FiBriefcase } from 'react-icons/fi';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { nftaddress, nftmarketaddress } from '../config';
import NFT from 'artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from 'artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { useRouter } from 'next/router';
import { localWeb3, magicLocal } from 'app/magic';

const Market = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const arrayItems = useAppSelector(marketSelector);

  const [magic, setMagic] = useState(magicLocal);
  const web3 = localWeb3();
  const [userMetadata, setUserMetadata] = useState();
  const [balance, setBalance] = useState('...');

  useEffect(() => {
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then((user) => {
          setUserMetadata(user);
        });
      } else {
        console.log('retrieve to login');
      }
    });
  }, [magicLocal]);

  useEffect(() => {
    dispatch(marketActions.fetchItems());
  }, []);

  const [show, setShow] = useState([]);

  const handleClose = (index) => () => {
    let temp = [...show];
    temp.splice(temp.indexOf(index), 1);
    setShow(temp);
  };
  const handleShow = (index) => () => {
    setShow([...show, index]);
  };

  const buyNft = async (nft) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        nftmarketaddress,
        NFTMarket.abi,
        signer
      );

      const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

      const transaction = await contract.createMarketSale(
        nftaddress,
        nft.marketId,
        {
          value: price,
        }
      );
      await transaction.wait();
      router.push('/assets');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBalance = (address) => {
    web3.eth
      .getBalance(address)
      .then((bal) => setBalance(web3.utils.fromWei(bal)));
  };

  const buyNftLocal = async (nft) => {
    try {
      const from = userMetadata.publicAddress;
      const contract = new web3.eth.Contract(NFTMarket.abi, nftmarketaddress);
      const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

      // Estimate gas and get balance
      const gas = await contract.methods
        .createMarketSale(nftaddress, nft.marketId)
        .estimateGas({
          from,
          value: price,
        });
      // Show caller balance and estimate fee
      // Send transaction
      const transaction = await contract.methods
        .createMarketSale(nftaddress, nft.marketId)
        .send({
          from,
          value: price,
          gas,
        });
      // Check result and show them for caller
      // Re-direct to assets page
      router.push('/assets');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='row w-100'>
      <div className='col-xl-12 pe-0 middle-wrap'>
        <FloatingButton icon={<FiPlus />} href={`/post/create`} />
        <FloatingButton icon={<FiBriefcase />} href={`/assets`} index={1} />
        <PageTitle title={'Market'} />
        <div className='row ms-0 w-100'>
          {arrayItems.isLoading ? (
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          ) : arrayItems.data.length < 1 ? (
            <h3>No item</h3>
          ) : (
            arrayItems.data.map((item, index) => (
              <div className='col-sm-4 p-0 me-3 mb-3' key={index}>
                <ItemCard item={item} onClick={handleShow(index)} />
                <Modal
                  contentClassName='rounded-xxl'
                  size='lg'
                  show={show.includes(index)}
                  onHide={handleClose(index)}
                >
                  <ItemDetail item={item} onAction={buyNftLocal} />
                </Modal>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

Market.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Market;
