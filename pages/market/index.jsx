import Layout from 'components/Layout';
import Slide from '../../components/carousel/Carousel';
import ItemCard from '../../components/itemcard/ItemCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  marketActions,
  marketSelector,
} from '../../features/market/marketSlice';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ItemDetail from '../../components/itemdetail/ItemDetail';
import FloatingButton from '../../components/floatingbutton/FloatingButton';
import PageTitle from '../../components/pagetitle/PageTitle';
import { FiPlus, FiBriefcase } from 'react-icons/fi';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { nftaddress, nftmarketaddress } from '../../config';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

const Market = () => {
  const dispatch = useAppDispatch();
  const arrayItems = useAppSelector(marketSelector);

  useEffect(() => {
    dispatch(marketActions.fetchItems());
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buyNft = async (nft) => {
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
  };

  return (
    <div className='row w-100'>
      <div className='col-xl-12 pe-0'>
        <FloatingButton icon={<FiPlus />} href={`/create`} />
        <FloatingButton icon={<FiBriefcase />} href={`/assets`} index={1} />
        <PageTitle title={'Market'} />
        <div className='row justify-content-center'>
          {arrayItems.isLoading ? (
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          ) : arrayItems.data.length < 1 ? (
            <h3>No item</h3>
          ) : (
            arrayItems.data.map((item, index) => (
              <div className='col-4' key={index}>
                <ItemCard item={item} onClick={handleShow} />
                <Modal size='lg' show={show} onHide={handleClose}>
                  <ItemDetail item={item} onAction={buyNft} />
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
