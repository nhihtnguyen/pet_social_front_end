import ItemCard from 'components/ItemCard';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ItemDetail from 'components/itemdetail/ItemDetail';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import NFT from 'contracts/NFT.json';
import NFTMarket from 'contracts/NFTMarket.json';
import axios from 'axios';
import { useRouter } from 'next/router';
import { magicLocal } from 'app/magic';
import { Masonry } from 'masonic';
import InvolveModal from 'components/modal/InvolveModal';
import { getPrimaryWallet } from 'helpers';
const nftAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const nftMarketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;

const MasonryCard =
  (method) =>
  ({ data }) => {
    const [info, setInfo] = useState({});
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState('');
    const [listingPrice, setListingPrice] = useState('');
    const [involve, setInvolve] = useState({});
    const [contract, setContract] = useState('');
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState(false);

    const [showInvolve, setShowInvolve] = useState(false);
    const router = useRouter();

    const estimateGas = (nft) => async () => {
      try {
        setListing(true);
        setShowInvolve(true);
        let provider = null;
        switch (method) {
          case 'metamask': {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            provider = new ethers.providers.Web3Provider(connection);
            break;
          }
          default: {
            provider = new ethers.providers.Web3Provider(
              magicLocal.rpcProvider
            );
            break;
          }
        }
        let signer = await provider.getSigner();

        // Approve

        const tokenContract = new ethers.Contract(nftAddress, NFT.abi, signer);
        const isApproved = tokenContract.isApprovedForAll(
          nft.owner,
          nftMarketAddress
        );
        if (!isApproved) {
          await tokenContract.setApprovalForAll(nftMarketAddress, true);
        }

        const marketContract = new ethers.Contract(
          nftMarketAddress,
          NFTMarket.abi,
          signer
        );
        setContract(marketContract);
        const priceParsed = ethers.utils.parseUnits(price, 'ether');
        let listingPrice = await marketContract.getListingPrice();
        listingPrice = listingPrice.toString();
        setListingPrice(listingPrice);

        // Estimate gas and mint token
        const gas = await marketContract.estimateGas.createMarketItem(
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
        setListing(false);
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

    useEffect(() => {
      let mounted = true;
      const controller = new AbortController();
      const signal = controller.signal;
      const loadToken = async (tokenID) => {
        try {
          if (mounted) {
            setLoading(true);
          }
          const provider = new ethers.providers.JsonRpcProvider();
          const tokenContract = new ethers.Contract(
            nftAddress,
            NFT.abi,
            provider
          );
          const tokenUri = await tokenContract.tokenURI(tokenID);
          const meta = await axios.get(tokenUri, { signal: signal });
          let item = {
            tokenId: Number(tokenID),
            image: String(meta.data.image),
            name: String(meta.data.name),
            description: String(meta.data.description),
            nftContract: String(nftAddress),
            owner: String(data.owner),
          };
          if (mounted) {
            setInfo(item);
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
        <ItemCard
          item={info}
          className={`m-0`}
          onClick={() => setShow(true)}
          loading={loading}
        />

        <Modal
          contentClassName='rounded-xxl border-0 p-0 m-0 bg-transparent'
          size='lg'
          show={show}
          onHide={() => setShow(false)}
        >
          <ItemDetail
            item={info}
            onAction={estimateGas(info)}
            actionName={'sell'}
            price={price}
            setPrice={setPrice}
          />
        </Modal>
        <InvolveModal
          show={showInvolve}
          handleClose={() => setShowInvolve(false)}
          data={involve}
          onConfirm={sellNFTs(info)}
          loading={listing}
          action={`Create market item`}
        />
      </>
    );
  };

const Assets = ({ refreshSignal }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    let mounted = true;
    const loadAssets = async () => {
      try {
        let { chosen, actionAddress } = getPrimaryWallet('asset');

        if (!actionAddress) {
          // show modal
          actionAddress = await magic.user.getMetadata();
          actionAddress = address.publicAddress.toLowerCase();
        }

        const provider = new ethers.providers.JsonRpcProvider();
        const tokenContract = new ethers.Contract(
          nftAddress,
          NFT.abi,
          provider
        );

        let addressBalance = await tokenContract.balanceOf(actionAddress);
        addressBalance = await addressBalance.toString();
        let tokenID = 0;
        let supply = await tokenContract.totalSupply();
        const items = [];

        for (tokenID = 1; tokenID <= supply; tokenID++) {
          let owner = await tokenContract.ownerOf(tokenID);
          if (items.length == addressBalance) {
            break;
          }
          if (owner.toLowerCase() == actionAddress) {
            items.push({ id: tokenID, owner });
          }
        }

        if (mounted) {
          setChosen(chosen);
          setAddress(actionAddress);
          setNfts(items);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAssets();
    return () => (mounted = false);
  }, [refreshSignal]);

  return (
    <>
      {loading ? (
        <Spinner animation='border' role='status' className='text-dark' />
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
    </>
  );
};

export default Assets;
