import Layout from 'components/Layout';
import ItemCard from 'components/itemcard/ItemCard';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ItemDetail from 'components/itemdetail/ItemDetail';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import PageTitle from 'components/pagetitle/PageTitle';
import { FiPlus, FiBriefcase } from 'react-icons/fi';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import NFTMarket from 'contracts/NFTMarket.json';
import NFT from 'contracts/NFT.json';
import { useRouter } from 'next/router';
import { localWeb3 as web3, magicLocal } from 'app/magic';
import { useAuth } from 'app/authContext';
import axios from 'axios';
import { Masonry } from 'masonic';
import InvolveModal from 'components/modal/InvolveModal';
const nftAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const nftMarketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;

const MasonryCard =
  (method) =>
  ({ data }) => {
    const [show, setShow] = useState(false);
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
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

        const gas = await _contract.estimateGas.createMarketSale(
          nftAddress,
          nft.marketId,
          {
            value: price,
          }
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
          Amount: nft.price.toString(),
          total: Number(Number(nft.price.toString()) + Number(gasFee)),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const buyNft = (nft) => async () => {
      try {
        setShowInvolve(false);
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

        transaction = await contract.createMarketSale(
          nftAddress,
          nft.marketId,
          {
            value: price,
          }
        );
        // Check result and show them for caller
        // Re-direct to assets page
        router.push('/assets');
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        <ItemCard item={data} onClick={() => setShow(true)} />

        <Modal
          contentClassName='rounded-xxl border-0 p-0 m-0 bg-transparent'
          size='lg'
          show={show}
          onHide={() => setShow(false)}
        >
          <ItemDetail item={data} onAction={estimateGas(data)} />
        </Modal>
        <InvolveModal
          show={showInvolve}
          handleClose={() => setShowInvolve(false)}
          data={involve}
          onConfirm={buyNft(data)}
          loading={loading}
          action={`Create market sale`}
        />
      </>
    );
  };

const toMarketItems = async (data, tokenContract) => {
  const items = await Promise.all(
    data.map(async (item) => {
      const tokenUri = await tokenContract.tokenURI(item.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(item.price.toString(), 'ether');
      let itemParsed = {
        marketId: Number(item.itemId.toNumber()),
        tokenId: Number(item.tokenId.toNumber()),
        seller: String(item.seller),
        owner: String(item.owner),
        image: String(meta.data.image),
        name: String(meta.data.name),
        description: String(meta.data.description),
        nftContract: String(item.nftContract),
        price,
      };
      return itemParsed;
    })
  );
  return items;
};

const Market = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [marketItems, setMarketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useState('');

  const loadMarketItems = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
      const marketContract = new ethers.Contract(
        nftMarketAddress,
        NFTMarket.abi,
        provider
      );
      const data = await marketContract.fetchMarketItems();
      console.log(data);
      setMarketItems(data);

      const items = await toMarketItems(data, tokenContract);
      setMarketItems(items);
    } catch (error) {
      // Logging, do something
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
      const _chosen =
        String(primaryWallet?.asset).toLowerCase() ==
        String(selected).toLowerCase()
          ? 'metamask'
          : null;

      setChosen(_chosen);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // On mounted
    loadMarketItems();
    getPrimaryWallet();
  }, []);

  return (
    <div className='middle-wrap me-3'>
      <FloatingButton icon={<FiPlus />} href={`/post/create`} />
      <FloatingButton icon={<FiBriefcase />} href={`/assets`} index={1} />
      <PageTitle title={'Market'} />
      {loading && (
        <Spinner animation='border' role='status' className='text-dark' />
      )}
      <div className='masonic'>
        <Masonry
          // Provides the data for our grid items
          items={marketItems}
          // Adds 12px of space between the grid cells
          columnGutter={12}
          // Sets the minimum column width to 172px
          columnWidth={172}
          // Pre-renders 5 windows worth of content
          overscanBy={5}
          // This is the grid item component
          render={MasonryCard(chosen)}
        />
      </div>

      {!loading && marketItems?.length < 1 && <h3>No item</h3>}
    </div>
  );
};

Market.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Market;
