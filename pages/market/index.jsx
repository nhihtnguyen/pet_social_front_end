import styles from '../../styles/Explore.module.scss';
import Header from '../../components/header/Header';
import LeftNav from '../../components/leftnav/LeftNav';
import PageTitle from '../../components/pagetitle/PageTitle';
import UploadImage from '../../components/uploadimage/UploadImage';
import Slide from '../../components/carousel/Carousel';
import ItemCard from '../../components/itemcard/ItemCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { marketActions, marketSelector } from '../../features/market/marketSlice';
import { useEffect, useState } from 'react';
import {
    nftaddress,
    nftmarketaddress
} from '../../config';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { ethers } from 'ethers'
//import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'
import { Modal } from 'react-bootstrap';
import ItemDetail from '../../components/itemdetail/ItemDetail';

//const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' });

const Market = () => {
    const dispatch = useAppDispatch();
    const arrayItems = useAppSelector(marketSelector);

    useEffect(() => {
        dispatch(marketActions.fetchItems());
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Header />
            <LeftNav />
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">

                            <div className="col-xl-12">
                                <div className="row ps-2 pe-1 justify-content-center">


                                    {arrayItems.isLoading
                                        ? <h3>Loading...</h3>
                                        : arrayItems.data.length < 1
                                            ? <h3>No item</h3>
                                            : arrayItems.data.map((item, index) =>
                                                <div className="col-4">
                                                    <ItemCard item={item} onClick={handleShow} />
                                                    <Modal size="lg"
                                                        show={show}
                                                        onHide={handleClose}>

                                                        <ItemDetail item={item} />

                                                    </Modal>
                                                </div>
                                            )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
};

export default Market;