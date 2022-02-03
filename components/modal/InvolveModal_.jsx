import { Modal } from 'react-bootstrap';
import Button from 'components/controls/Button';
import InvolveCard from 'components/InvolveCard';
import { useEffect } from 'react';
import { ethers } from 'ethers';
import { useState } from 'react';

const InvolveModal = ({
  show,
  handleClose,
  onConfirm,
  estimatedGas,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [involve, setInvolve] = useState('');

  useEffect(() => {
    const getInvolve = async () => {
      if (estimatedGas) {
        const provider = new ethers.providers.JsonRpcProvider();

        const gas = estimatedGas;
        const gasData = await provider.getFeeData();
        const gasFee =
          ethers.utils.formatEther(gasData.gasPrice.toString()) *
          gas.toNumber();

        setInvolve({
          'Estimated gas fee': gasFee,
          'Gas limit': gas.toString(),
          'Max fee per gas': gasData.maxFeePerGas.toString(),
          total: Number(Number(amount) + Number(gasFee)),
        });
        setLoading(false);
      }
    };
    getInvolve();
  }, [estimatedGas]);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
      contentClassName='bg-transparent p-0 m-0 border-0'
    >
      <InvolveCard involve={involve} loading={loading} {...props} />
      {!loading && (
        <div className='ms-auto mt-2'>
          <Button variant='primary border-0' onClick={() => onConfirm()}>
            Confirm
          </Button>{' '}
          <Button variant='danger border-0' onClick={handleClose}>
            Reject
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default InvolveModal;
