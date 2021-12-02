import styles from '../../styles/Explore.module.scss';
import Header from '../../components/header/Header';
import LeftNav from '../../components/leftnav/LeftNav';
import Slide from '../../components/carousel/Carousel';
import ItemCard from '../../components/itemcard/ItemCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { marketActions, marketSelector } from '../../features/market/marketSlice';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ItemDetail from '../../components/itemdetail/ItemDetail';
import FloatingButton from '../../components/floatingbutton/FloatingButton';
import PageTitle from '../../components/pagetitle/PageTitle';
import { FiPlus, FiBriefcase } from 'react-icons/fi';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import {
    nftaddress,
    nftmarketaddress
} from '../../config';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import axios from 'axios';

const Assets = () => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState('');

    useEffect(() => {
        loadNFTs();
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sellNFT = async (nft) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
        await contract.approve(nftmarketaddress, nft.tokenId);
        const priceParsed = ethers.utils.parseUnits(price, 'ether');


        contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        const transaction = await contract.createMarketItem(nft.nftContract, nft.tokenId, priceParsed, { value: listingPrice })

        await transaction.wait();
    }
    const loadNFTs = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
        const data = await marketContract.fetchMyNFTs();

        const items = await Promise.all(data.map(async (i) => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                marketId: 0,
                tokenId: Number(i.tokenId.toNumber()),
                seller: String(i.seller),
                owner: String(i.owner),
                image: String(meta.data.image),
                name: String(meta.data.name),
                description: String(meta.data.description),
                price: Number(price),
                nftContract: String(i.nftContract)
            };
            return item
        }))
        setNfts(items);
        setLoading(false);
    }

    return (
        <div>
            <Header />
            <LeftNav />
            <FloatingButton icon={<FiPlus />} href={`/create`} />

            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row w-100">

                            <div className="col-xl-12">
                                <div className="row ps-2 pe-1 justify-content-center">
                                    <PageTitle title={'My Assets'} />


                                    {loading
                                        ? <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                        : nfts.length < 1
                                            ? <h3>No item</h3>
                                            : nfts.map((item, index) =>
                                                <div className="col-4" key={index}>
                                                    <ItemCard item={item} onClick={handleShow} />
                                                    <Modal size="lg"
                                                        show={show}
                                                        onHide={handleClose}>

                                                        <ItemDetail
                                                            item={item}
                                                            onAction={sellNFT}
                                                            actionName={'sell'}
                                                            price={price}
                                                            setPrice={setPrice}
                                                        />

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

export default Assets;