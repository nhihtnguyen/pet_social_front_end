import { Modal } from 'react-bootstrap';
import Button from 'components/controls/Button';
import InvolveCard from 'components/InvolveCard';

const InvolveModal = ({
  show,
  handleClose,
  data,
  loading,
  onConfirm,
  action,
  tooltip,
}) => (
  <Modal
    show={show}
    onHide={handleClose}
    backdrop='static'
    keyboard={false}
    contentClassName='bg-transparent p-0 m-0 border-0'
  >
    <InvolveCard
      data={data}
      loading={loading}
      action={action}
      tooltip={tooltip}
    />
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

export default InvolveModal;
