import { Layout } from 'components/Layout';
import PageTitle from 'components/PageTitle';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import LoadWallets from 'components/LoadWallets';
import { FiPlusCircle } from 'react-icons/fi';

const Wallet = () => {
  const connect = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const newProvider = new ethers.providers.Web3Provider(connection);
  };

  return (
    <div className='middle-wrap pe-sm-3'>
      <PageTitle
        title={'Wallet'}
        shortcutButtons={[
          { label: 'Connect', onClick: connect, icon: <FiPlusCircle /> },
        ]}
      />

      <div className='row w-100 m-0 p-0'>
        <LoadWallets refreshSignal={connect} />
      </div>
    </div>
  );
};

Wallet.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Wallet;
