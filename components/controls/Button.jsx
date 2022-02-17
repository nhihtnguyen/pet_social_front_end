import { Button } from 'react-bootstrap';
import styles from './Controls.module.scss';

const PrimaryButton = ({ onClick, children, className, ...props }) => {
  return (
    <Button
      className={`${styles['primary-button']} ${className}`}
      size='lg'
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};
export default PrimaryButton;
