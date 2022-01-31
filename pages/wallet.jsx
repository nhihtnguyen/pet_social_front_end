import React, { useEffect, useState } from 'react';
import { magicLocal, localWeb3 } from 'app/magic';
import { Spinner, Card, Placeholder } from 'react-bootstrap';
import { Layout } from 'components/Layout';
import PageTitle from 'components/pagetitle/PageTitle';
import WalletCard from 'components/walletcard/WalletCard';

const Wallet = () => {
  const [magic, setMagic] = useState(magicLocal);
  const web3 = localWeb3();
  const [userMetadata, setUserMetadata] = useState();
  const [balance, setBalance] = useState('...');
  const network = 'local';
  console.log(magic, web3);
  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile, balance and contract message.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then((user) => {
          setUserMetadata(user);
          fetchBalance(user.publicAddress);
        });
      } else {
        // If no user is logged in, redirect to `/login`
        // router.push('/login');
        console.log('retrieve to login');
      }
    });
  }, [magic]);

  const fetchBalance = (address) => {
    web3.eth
      .getBalance(address)
      .then((bal) => setBalance(web3.utils.fromWei(bal)));
  };

  const loading = !userMetadata;
  return (
    <div className='middle-wrap pe-3'>
      <PageTitle title={'Wallet'} />

      <div className='row w-100'>
        <div className='col-sm-6 mb-3 justify-content-between'>
          <WalletCard
            balance={balance}
            user={userMetadata}
            magic={magic}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

Wallet.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Wallet;
