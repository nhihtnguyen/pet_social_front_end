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
import NFT from 'contracts/NFT.json';
import NFTMarket from 'contracts/NFTMarket.json';
import axios from 'axios';
import { useRouter } from 'next/router';
import { localWeb3 as web3, magicLocal } from 'app/magic';
import { Masonry } from 'masonic';
import InvolveModal from 'components/modal/InvolveModal';
const nftAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const nftMarketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;

const MasonryCard =
  (method) =>
  ({ data }) => {
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState('');
    const [listingPrice, setListingPrice] = useState('');
    const [involve, setInvolve] = useState({});
    const [contract, setContract] = useState('');
    const [loading, setLoading] = useState(false);
    const [showInvolve, setShowInvolve] = useState(false);
    const router = useRouter();

    const estimateGas = (nft) => async () => {
      try {
        setLoading(true);
        setShowInvolve(true);
        let signer = null;
        switch (method) {
          case 'metamask': {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            signer = await provider.getSigner();
            break;
          }
          default: {
            const provider = new ethers.providers.Web3Provider(
              magicLocal.rpcProvider
            );
            signer = await provider.getSigner();
            break;
          }
        }
        // Estimate gas and mint token
        const _contract = new ethers.Contract(
          nftMarketAddress,
          NFTMarket.abi,
          signer
        );
        setContract(_contract);
        const priceParsed = ethers.utils.parseUnits(price, 'ether');
        let listingPrice = await _contract.getListingPrice();
        listingPrice = listingPrice.toString();
        setListingPrice(listingPrice);
        const gas = await _contract.estimateGas.createMarketItem(
          nft.nftContract,
          nft.tokenId,
          priceParsed,
          { value: listingPrice }
        );

        const gasData = await signer.getFeeData();
        const gasFee =
          ethers.utils.formatEther(gasData.gasPrice.toString()) *
          gas.toNumber();

        setInvolve({
          'Estimated gas fee': gasFee,
          'Gas limit': gas.toString(),
          'Gas Price':
            ethers.utils.formatUnits(gasData.gasPrice.toString(), 'gwei') +
            ' gwei',
          'Max fee per gas':
            ethers.utils.formatUnits(gasData.maxFeePerGas.toString(), 'gwei') +
            ' gwei',
          Amount: ethers.utils.formatEther(listingPrice).toString(),
          total: Number(
            Number(ethers.utils.formatEther(listingPrice).toString()) +
              Number(gasFee)
          ),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const sellNFTs = (nft) => async () => {
      try {
        const priceParsed = ethers.utils.parseUnits(price, 'ether');

        const transaction = await contract.createMarketItem(
          nft.nftContract,
          nft.tokenId,
          priceParsed,
          { value: listingPrice }
        );

        router.push('/market');
      } catch (error) {
        console.log(error);
      }
    };

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
            onAction={estimateGas(data)}
            actionName={'sell'}
            price={price}
            setPrice={setPrice}
          />
        </Modal>
        <InvolveModal
          show={showInvolve}
          handleClose={() => setShowInvolve(false)}
          data={involve}
          onConfirm={sellNFTs(data)}
          loading={loading}
          action={`Create market item`}
        />
      </>
    );
  };

const Assets = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useState('');

  const getPrimaryWallet = () => {
    try {
      let primaryWallet = localStorage.getItem('primary_wallet');
      let selected;
      if (primaryWallet) {
        primaryWallet = JSON.parse(primaryWallet);
      }
      if (window.ethereum) {
        selected = window.ethereum.selectedAddress;
      }
      let chosen =
        String(primaryWallet?.asset).toLowerCase() ==
        String(selected).toLowerCase()
          ? 'metamask'
          : null;

      setChosen(chosen);
      return chosen;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      let chosen = getPrimaryWallet();
      loadLocal2(chosen);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadLocal2 = async (method) => {
    let signer = null;
    switch (method) {
      case 'metamask': {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        signer = await provider.getSigner();
        break;
      }
      default: {
        const provider = new ethers.providers.Web3Provider(
          magicLocal.rpcProvider
        );
        signer = await provider.getSigner();
        break;
      }
    }
    let from = await signer.getAddress();

    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, signer);
    //let balance = await tokenContract.methods.balanceOf(from).call();

    let i = 0;
    let supply = await tokenContract.totalSupply();
    const items = [];
    for (i = 1; i <= supply; i++) {
      // this will check each nft owner
      // i is the id of each nft.

      // this will return the owner address
      let owner = await tokenContract.ownerOf(i);
      if (owner == from) {
        items.push;
        const tokenUri = await tokenContract.tokenURI(i);
        const meta = await axios.get(tokenUri);
        let item = {
          tokenId: Number(i),
          image: String(meta.data.image),
          name: String(meta.data.name),
          description: String(meta.data.description),
          nftContract: String(nftAddress),
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
              overscanBy={4}
              // This is the grid item component
              render={MasonryCard(chosen)}
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
