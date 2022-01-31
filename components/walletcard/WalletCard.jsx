import { Card, Placeholder } from 'react-bootstrap';

const WalletCard = ({ user, magic, balance, loading }) => {
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
            <div className='fw-600 text-white-50'>
              <span>Local</span>
            </div>
            <div className='font-sm text-opacity-75 text-white'>
              {user.publicAddress}
            </div>

            <div className='text-white-50'>
              {balance.toString().substring(0, 6)}{' '}
              {magic.network === 'matic' ? 'MATIC' : 'ETH'}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default WalletCard;
