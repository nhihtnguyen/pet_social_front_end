import { Button } from 'react-bootstrap';

const PrimaryButton = ({ variant, onClick, children }) => {
  return (
    <Button
      style={{
        padding: '0.5rem 1.5rem',
        fontSize: 14,
        borderRadius: 30,
      }}
      variant='primary'
      size='lg'
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
export default PrimaryButton;
