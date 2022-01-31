import Layout from 'components/Layout';
import ItemCard from 'components/itemcard/ItemCard';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ItemDetail from 'components/itemdetail/ItemDetail';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import PageTitle from 'components/pagetitle/PageTitle';
import { FiPlus, FiShoppingBag } from 'react-icons/fi';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { nftaddress, nftmarketaddress } from 'config';
import NFT from 'artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from 'artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import axios from 'axios';
import { useRouter } from 'next/router';
import { localWeb3, magicLocal } from 'app/magic';
import { Masonry } from 'masonic';

const MasonryCard = ({ data }) => {
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState('');

  return (
    <>
      <ItemCard item={data} className={`m-0`} onClick={() => setShow(true)} />

      <Modal
        contentClassName='rounded-xxl border-0 p-0 m-0 bg-transparent'
        size='lg'
        show={show}
        onHide={() => setShow(false)}
      >
        <ItemDetail
          item={data}
          onAction={() => {}}
          actionName={'sell'}
          price={price}
          setPrice={setPrice}
        />
      </Modal>
    </>
  );
};

const Assets = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState('');

  useEffect(() => {
    loadLocal2();
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

  const sellNFT = async (nft) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
      await contract.approve(nftmarketaddress, nft.tokenId);
      const priceParsed = ethers.utils.parseUnits(price, 'ether');

      contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();
      const transaction = await contract.createMarketItem(
        nft.nftContract,
        nft.tokenId,
        priceParsed,
        { value: listingPrice }
      );

      await transaction.wait();
      router.push('/market');
    } catch (error) {
      console.log(error);
    }
  };
  const sellNFTsLocal = async () => {};
  const loadNFTs = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          marketId: 0,
          tokenId: Number(i.tokenId.toNumber()),
          seller: String(i.seller),
          owner: String(i.owner),
          image: String(meta.data.image),
          name: String(meta.data.name),
          description: String(meta.data.description),
          price: Number(price),
          nftContract: String(i.nftContract),
        };
        return item;
      })
    );
    setNfts(items);
    setLoading(false);
  };

  const loadLocal = async () => {
    const web3 = localWeb3();
    const user = await magicLocal.user.getMetadata();
    const from = user.publicAddress;

    const marketContract = new web3.eth.Contract(
      NFTMarket.abi,
      nftmarketaddress
    );

    const tokenContract = new web3.eth.Contract(NFT.abi, nftaddress);
    const data = await marketContract.methods
      .fetchMyNFTs()
      .call({ from: '0x66ef075aa37E5e0D77A764009F35352BFaE4b898' });
    console.log('assest', data);

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.methods.tokenURI(i.tokenId).call();
        console.log(tokenUri);
        const meta = await axios.get(tokenUri);

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          marketId: 0,
          tokenId: Number(i.tokenId),
          seller: String(i.seller),
          owner: String(i.owner),
          image: String(meta.data.image),
          name: String(meta.data.name),
          description: String(meta.data.description),
          price: Number(price),
          nftContract: String(i.nftContract),
        };
        console.log('object', item);
        return item;
      })
    );
    setNfts(items);
    setLoading(false);
  };

  const loadLocal2 = async () => {
    const web3 = localWeb3();
    const user = await magicLocal.user.getMetadata();
    const from = user.publicAddress;

    const tokenContract = new web3.eth.Contract(NFT.abi, nftaddress);
    let balance = await tokenContract.methods.balanceOf(from).call();
    let i = 0;
    let supply = await tokenContract.methods.totalSupply().call();
    const items = [];
    console.log(supply);
    for (i = 1; i <= supply; i++) {
      // this will check each nft owner
      // i is the id of each nft.

      // this will return the owner address
      let owner = await tokenContract.methods.ownerOf(i).call();
      console.log(owner);
      if (owner == from) {
        items.push;
        const tokenUri = await tokenContract.methods.tokenURI(i).call();
        const meta = await axios.get(tokenUri);
        let item = {
          tokenId: Number(i.tokenId),
          image: String(meta.data.image),
          name: String(meta.data.name),
          description: String(meta.data.description),
          nftContract: String(i.nftContract),
        };
        items.push(item);
        //setNfts(items);
      }
      // if owner == msg.sender then we know he owns this token id
    }

    setNfts(items);
    setLoading(false);
  };
  return (
    <div className='row w-100'>
      <div className='col-xl-12 pe-0 middle-wrap'>
        <FloatingButton icon={<FiPlus />} href={`/post/create`} />
        <FloatingButton icon={<FiShoppingBag />} href={`/market`} index={1} />
        <PageTitle title={'My Assets'} />
        {loading ? (
          <Spinner animation='border' role='status' className='text-dark'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : (
          <div className='masonic m-auto p-0'>
            <Masonry
              // Provides the data for our grid items
              items={nfts || []}
              // Adds 8px of space between the grid cells
              columnGutter={12}
              // Sets the minimum column width to 172px
              columnWidth={172}
              // Pre-renders 5 windows worth of content
              overscanBy={5}
              // This is the grid item component
              render={MasonryCard}
            />
          </div>
        )}
        {!loading && nfts.length < 1 && <h3>No item</h3>}
      </div>
    </div>
  );
};

Assets.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Assets;

//  nfts.map((item, index) => (
//    <div className='col-3 p-0 mb-3 me-3' key={index}>
//      <ItemCard item={item} onClick={handleShow(index)} />
//    </div>
//  ));
