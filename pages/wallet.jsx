import React, { useEffect, useState } from 'react';
import { magicLocal, localWeb3 } from 'app/magic';
import { Spinner, Card } from 'react-bootstrap';
import { Layout } from 'components/Layout';

function Info({ user, magic, balance }) {
  return (
    <Card className='rounded-xxl'>
      <Card.Body>
        <h2>Network</h2>
        <div className='info'>local</div>
        <h2>Public Address</h2>
        <div className='info'>{user.publicAddress}</div>
        <h2>Balance</h2>
        <div className='info'>
          {balance.toString().substring(0, 6)}{' '}
          {magic.network === 'matic' ? 'MATIC' : 'ETH'}
        </div>
      </Card.Body>
    </Card>
  );
}

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

  return userMetadata ? (
    <div className='middle-wrap pe-3'>
      <Info balance={balance} user={userMetadata} magic={magic} />
    </div>
  ) : (
    <Spinner animation='border' />
  );
};

Wallet.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Wallet;
