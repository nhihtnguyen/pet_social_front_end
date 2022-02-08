import Input from 'components/controls/Input';
import Button from 'components/controls/Button';
import InvolveModal from 'components/modal/InvolveModal';
import { FiArrowUpRight } from 'react-icons/fi';
import { Form, Spinner } from 'react-bootstrap';
import { ethers } from 'ethers';
import { useState } from 'react';

const SendTransaction = ({ provider }) => {
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const [asset, setAsset] = useState('ETH');
  const [sending, setSending] = useState(false);
  const [showInvolve, setShowInvolve] = useState(false);
  const [involve, setInvolve] = useState({});
  const [estimatedGas, setEstimatedGas] = useState('auto');

  const estimateGas = async () => {
    try {
      setSending(true);
      setShowInvolve(true);

      const signer = await provider.getSigner();
      const gas = await signer.estimateGas({
        to,
        value: ethers.utils.parseEther(amount),
      });
      setEstimatedGas(gas.toString());
      const gasData = await provider.getFeeData();

      const gasFee =
        ethers.utils.formatEther(gasData.gasPrice.toString()) * gas.toNumber();

      setInvolve({
        'Estimated gas fee': gasFee,
        'Gas limit': gas.toString(),
        'Max fee per gas': gasData.maxFeePerGas.toString(),
        total: Number(Number(amount) + Number(gasFee)),
      });
    } catch (error) {
      console.log(error);
      setShowInvolve(false);
    } finally {
      setSending(false);
    }
  };

  const send = async () => {
    try {
      setShowInvolve(false);

      setSending(true);
      const signer = await provider.getSigner();

      const transaction = await signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(amount),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };
  return (
    <div style={{ top: 10, right: 10 }} className='position-absolute'>
      <span
        className='text-grey-900 font-lg btn-dark bg-greylight card text-dark mb-1'
        onClick={() => setShowInput(!showInput)}
      >
        {<FiArrowUpRight />}
      </span>{' '}
      <Form className={`${showInput ? 'd-block' : 'd-none'}`}>
        <Input
          placeholder='To'
          type='text'
          className='mb-1'
          onChange={(e) => setTo(e.target.value)}
          value={to}
        />
        <Input
          placeholder='Asset'
          type='text'
          className='mb-1'
          value={asset}
          disabled
          onChange={(e) => setAsset(e.target.value)}
        />
        <Input
          placeholder='Amount'
          type='text'
          className='mb-1'
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        {!sending && (
          <>
            {' '}
            <Button className='rounded ms-auto border-0' onClick={estimateGas}>
              Send
            </Button>{' '}
            <Button
              className='rounded ms-auto btn-danger border-0'
              onClick={() => setShowInput(false)}
            >
              Cancel
            </Button>
          </>
        )}
        {sending && <Spinner animation='border' className='text-dark' />}
      </Form>
      <InvolveModal
        show={showInvolve}
        handleClose={() => setShowInvolve(false)}
        data={involve}
        onConfirm={send}
        loading={sending}
        action={`Send ${amount} ${asset}`}
        tooltip={`to ${to}`}
      />
    </div>
  );
};

export default SendTransaction;
