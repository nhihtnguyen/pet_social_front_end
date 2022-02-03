import { useEffect, useState } from 'react';
import { magicLocal as magic } from 'app/magic';
import { Layout } from 'components/Layout';
import PageTitle from 'components/pagetitle/PageTitle';
import WalletCard from 'components/WalletCard';
import { ethers } from 'ethers';
import { useAuth } from 'app/authContext';
import Web3Modal from 'web3modal';
import { FiPlusCircle } from 'react-icons/fi';

const Wallet = () => {
  const { user } = useAuth();
  const [providers, setProviders] = useState([]);
  const [primary, setPrimary] = useState({});

  const connect = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const newProvider = new ethers.providers.Web3Provider(connection);
    if (!providers.includes(newProvider)) {
      providers.push(newProvider);
    }
  };

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
      setProviders(listWallet);
    };

    getWallet();
  }, [magic]);

  return (
    <div className='middle-wrap pe-3'>
      <PageTitle
        title={'Wallet'}
        shortcutButtons={[
          { label: 'Connect', onClick: connect, icon: <FiPlusCircle /> },
        ]}
      />

      <div className='row w-100'>
        {providers.map((provider) => (
          <div
            className='col-sm-6 mb-3 justify-content-between'
            key={provider.name}
          >
            <WalletCard
              provider={provider}
              loading={!user}
              primary={primary}
              setPrimary={setPrimary}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Wallet.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Wallet;
