import { useEffect, useState } from 'react';
import { magicLocal as magic } from 'app/magic';
import { Spinner } from 'react-bootstrap';
import WalletCard from 'components/WalletCard';
import { ethers } from 'ethers';
import { useAuth } from 'app/authContext';

const Wallet = ({ refreshSignal }) => {
  const { user } = useAuth();
  const [providers, setProviders] = useState([]);
  const [primary, setPrimary] = useState({});
  const [loading, setLoading] = useState(true);

  const primaryWallet = localStorage.getItem('primary_wallet');

  useEffect(() => {
    try {
      if (primaryWallet) {
        setPrimary(JSON.parse(primaryWallet));
      }
    } catch (error) {
      console.log(error);
    }

    // Unmount
  }, [primaryWallet]);
  // Get all connected wallet
  useEffect(() => {
    // On mounted
    let mounted = true;
    const getWallet = async () => {
      const listWallet = [];
      // Integrated account
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      provider.name = 'Integrated';
      listWallet.push(provider);
      // Connected account
      if (typeof window.ethereum != 'undefined') {
        const metamask = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await metamask.listAccounts();
        if (accounts?.length > 0) {
          metamask.name = 'Metamask';
          listWallet.push(metamask);
        }
      }
      if (mounted) {
        setProviders(listWallet);
        setLoading(false);
      }
    };

    getWallet();

    // On unmount
    return () => (mounted = false);
  }, [magic, refreshSignal]);

  return (
    <>
      {loading && (
        <Spinner animation='border' role='status' className='text-dark' />
      )}
      {providers?.map((provider) => (
        <div className='col-sm-6 mb-3' key={provider.name}>
          <WalletCard
            provider={provider}
            loading={!user}
            primary={primary}
            setPrimary={setPrimary}
          />
        </div>
      ))}
      {!loading && providers?.length < 1 && <h3>No item</h3>}
    </>
  );
};

export default Wallet;
