import ItemCard from 'components/ItemCard';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ItemDetail from 'components/itemdetail/ItemDetail';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import NFTMarket from 'contracts/NFTMarket.json';
import NFT from 'contracts/NFT.json';
import { useRouter } from 'next/router';
import { magicLocal } from 'app/magic';
import { getPrimaryWallet } from 'helpers';
import axios from 'axios';
import Masonry from 'components/Masonry';
import InvolveModal from 'components/modal/InvolveModal';
const nftAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const nftMarketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;
import { useNotification } from 'app/notificationContext';

const MasonryCard =
  (method) =>
  ({ data }) => {
    const [info, setInfo] = useState(data);
    const [show, setShow] = useState(false);
    const [involve, setInvolve] = useState({});
    const [contract, setContract] = useState('');
    const [loading, setLoading] = useState(false);
    const [buying, setBuying] = useState(false);

    const [showInvolve, setShowInvolve] = useState(false);
    const router = useRouter();
    const { showMessage } = useNotification();

    const estimateGas = (nft) => async () => {
      try {
        setBuying(true);
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
        showMessage(
          {
            title: 'System',
            content: error.message,
          },
          3000,
          'danger'
        );
      } finally {
        setBuying(false);
      }
    };

    const buyNft = (nft) => async () => {
      try {
        setShowInvolve(false);
        setShow(false);
        showMessage(
          {
            title: 'System',
            content: 'Working...',
          },
          0,
          'info',
          true
        );
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

        const transaction = await contract.createMarketSale(
          nftAddress,
          nft.marketId,
          {
            value: price,
          }
        );
        console.log('b', transaction);
        await transaction.wait();
        console.log('a', transaction);

        showMessage(
          {
            title: 'System',
            content: `Bought successfully. Check: ${
              process.env.NEXT_PUBLIC_ETHERSCAN_URL + '/' + transaction?.hash
            }`,
          },
          3000,
          'success',
          false
        );
        // Check result and show them for caller
        // Re-direct to assets page
        router.push('/assets');
      } catch (error) {
        console.log(error);
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

    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      let mounted = true;
      const loadToken = async () => {
        try {
          setLoading(true);
          const provider = new ethers.providers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_RPC_URL
          );
          const tokenContract = new ethers.Contract(
            nftAddress,
            NFT.abi,
            provider
          );

          const tokenUri = await tokenContract.tokenURI(data.tokenId);
          const meta = await axios.get(tokenUri, { signal: signal });
          let price = ethers.utils.formatUnits(data.price.toString(), 'ether');
          let itemParsed = {
            marketId: Number(data.itemId.toNumber()),
            tokenId: Number(data.tokenId.toNumber()),
            seller: String(data.seller),
            owner: String(data.owner),
            image: String(meta.data.image),
            name: String(meta.data.name),
            description: String(meta.data.description),
            nftContract: String(data.nftContract),
            price,
          };
          if (mounted) {
            setInfo(itemParsed);
          }
        } catch (error) {
          console.log(error);
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

      loadToken(data?.id);
      return () => (mounted = false && controller.abort());
    }, []);
    return (
      <>
        <ItemCard item={info} onClick={() => setShow(true)} loading={loading} />

        <Modal
          contentClassName='rounded-xxl border-0 p-0 m-0 bg-transparent'
          size='lg'
          show={show}
          onHide={() => setShow(false)}
        >
          <ItemDetail item={info} onAction={estimateGas(info)} />
        </Modal>
        <InvolveModal
          show={showInvolve}
          handleClose={() => setShowInvolve(false)}
          data={involve}
          onConfirm={buyNft(info)}
          loading={buying}
          action={`Create market sale`}
        />
      </>
    );
  };

const LoadMarket = ({ refreshSignal }) => {
  const [marketItems, setMarketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useState('');

  useEffect(() => {
    // On mounted
    let mounted = true;
    // Async load function
    const loadMarketItems = async () => {
      try {
        //
        let { chosen } = getPrimaryWallet('asset');

        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        );

        const marketContract = new ethers.Contract(
          nftMarketAddress,
          NFTMarket.abi,
          provider
        );

        const data = await marketContract.fetchMarketItems();
        if (mounted) {
          setChosen(chosen);
          setMarketItems(data);
        }
      } catch (error) {
        // Logging, do something
        console.log(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    loadMarketItems();
    // Cleanup on unmount
    return () => (mounted = false);
  }, [refreshSignal]);

  return (
    <>
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
    </>
  );
};

export default LoadMarket;
