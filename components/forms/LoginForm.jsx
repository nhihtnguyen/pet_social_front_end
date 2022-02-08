import Input from 'components/controls/Input';
import Check from 'components/controls/Check';
import { Form } from 'react-bootstrap';
import { FiMail, FiLock } from 'react-icons/fi';
import Link from 'next/link';
import useForm from 'hooks/useForm';
import validateInfo from './validateInfo';

const initValues = {
  email: '',
};

const LoginForm = ({ onSubmit, validated }) => {
  const {
    handleChange: onChange,
    values: info,
    errors,
    handleSubmit,
    resetForm,
  } = useForm(initValues, true, validateInfo, onSubmit, ['email']);
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Input
        onChange={onChange('email')}
        value={info.email}
        invalidTooltip={errors.email}
        type='email'
        id='email'
        className='mb-3'
        inputClassName='style2-input ps-5'
        placeholder='Your Email Address'
        startIcon={<FiMail />}
        required
      />

      <div className='form-group mb-1'>
        <button
          type='submit'
          className='form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 '
        >
          Login
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
