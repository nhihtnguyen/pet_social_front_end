import { Card, Placeholder } from 'react-bootstrap';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import SendTransaction from 'components/SendTransaction';

const WalletCard = ({
  publicAddress,
  provider,
  loading,
  primary,
  setPrimary,
}) => {
  const [balance, setBalance] = useState('...');
  const [address, setAddress] = useState('...');

  const onChangePrimary = (action) => () => {
    try {
      const temp = { ...primary };
      temp[action] = primary[action] == address ? undefined : address;
      setPrimary(temp);
      localStorage.setItem('primary_wallet', JSON.stringify(temp));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBalance = async (address) => {
    try {
      setBalance('...');
      const signer = await provider.getSigner();
      const publicAddress = await signer.getAddress();
      setAddress(publicAddress);
      let balance = await signer.getBalance();
      balance = ethers.utils.formatEther(balance);
      setBalance(balance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // On mount
    if (provider) {
      fetchBalance(publicAddress);
    }
  }, [provider]);
  return (
    <Card
      className='rounded-xxl shadow-xss border-0'
      style={{
        maxWidth: 300,
        background:
          'linear-gradient(110deg, rgba(52,50,55,1) 25%, rgba(81,153,120,1) 95%)',
      }}
    >
      <Card.Body className='fw-600 text-grey-800'>
        {loading ? (
          <Placeholder as='h2' animation='glow'>
            <Placeholder xs={7} /> <Placeholder xs={12} />{' '}
            <Placeholder xs={8} />{' '}
          </Placeholder>
        ) : (
          <>
            <div>
              <span
                className={`cursor-pointer btn-round-xs bg-white theme-dark-bg${
                  primary?.asset == address ? ' text-current' : ''
                }`}
                onClick={onChangePrimary('asset')}
              >
                A
              </span>{' '}
              <span
                className={`cursor-pointer btn-round-xs bg-white theme-dark-bg${
                  primary?.buy == address ? ' text-current' : ''
                }`}
                onClick={onChangePrimary('buy')}
              >
                B
              </span>{' '}
              <span
                className={`cursor-pointer btn-round-xs bg-white theme-dark-bg${
                  primary?.sell == address ? ' text-current' : ''
                }`}
                onClick={onChangePrimary('sell')}
              >
                S
              </span>
            </div>
            <div className='fw-600 text-white-50'>
              <span>{provider.name}</span>
            </div>
            <div className='font-sm text-opacity-75 text-white font-monospace'>
              {address}
            </div>

            <div className='text-white-50 '>
              {balance.toString().substring(0, 6)} {'ETH'}{' '}
              <a className='cursor-pointer' onClick={fetchBalance}>
                <FiRefreshCw />
              </a>
            </div>
            <SendTransaction provider={provider} />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default WalletCard;
