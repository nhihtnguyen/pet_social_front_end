import Input from 'components/controls/Input';
import Check from 'components/controls/Check';
import { Form } from 'react-bootstrap';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import useForm from 'hooks/useForm';
import validateRegister from './validateRegister';

const initValues = {
  last_name: '',
  email: '',
  first_name: '',
  password: '',
};

const RegisterForm = ({ onSubmit, validated = false }) => {
  const {
    handleChange: onChange,
    values: info,
    errors,
    handleSubmit,
    resetForm,
  } = useForm(initValues, true, validateRegister, onSubmit);
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Input
        value={info.email}
        onChange={onChange('email')}
        invalidTooltip={errors['email']}
        type='email'
        name='email'
        className='mb-3'
        inputClassName='style2-input ps-5'
        placeholder='Your Email Address'
        startIcon={<FiMail />}
      />
      <Input
        value={info.first_name}
        onChange={onChange('first_name')}
        invalidTooltip={errors['first_name']}
        type='text'
        name='first_name'
        className='mb-3'
        inputClassName='style2-input ps-5'
        placeholder='First Name'
        startIcon={<FiUser />}
      />
      <Input
        value={info.last_name}
        onChange={onChange('last_name')}
        invalidTooltip={errors['last_name']}
        type='text'
        name='last_name'
        className='mb-3'
        inputClassName='style2-input ps-5'
        placeholder='Last Name'
        startIcon={<FiUser />}
      />

      <Check
        label={`Accept Term and Conditions`}
        labelClassName='font-xssss text-grey-500'
        className='mb-2'
      />
      <div className='form-group mb-1'>
        <button
          type='submit'
          className='form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 '
        >
          Register
        </button>
      </div>
    </Form>
  );
};

export default RegisterForm;
