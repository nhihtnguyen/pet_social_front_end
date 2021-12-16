import Input from 'components/controls/Input';
import Check from 'components/controls/Check';
import { Form } from 'react-bootstrap';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import Link from 'next/link';

const RegisterForm = ({ onSubmit, validated }) => {
  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Input
        type='text'
        id='fullname'
        className='mb-3'
        inputClassName='style2-input ps-5'
        placeholder='Your Name'
        startIcon={<FiUser />}
        required
      />
      <Input
        type='text'
        id='username'
        className='mb-3'
        inputClassName='style2-input ps-5'
        placeholder='Your Email Address'
        startIcon={<FiMail />}
        required
      />
      <Input
        type='password'
        id='password'
        className='mb-3'
        inputClassName='style2-input ps-5'
        placeholder='Password'
        startIcon={<FiLock />}
        required
      />
      <Input
        type='password'
        id='retype-password'
        className='mb-1'
        inputClassName='style2-input ps-5'
        placeholder='Confirm Password'
        startIcon={<FiLock />}
        required
      />
      <Check
        label={`Accept Term and Conditions`}
        labelClassName='font-xssss text-grey-500'
        className='mb-2'
        required
      />
    </Form>
  );
};

export default RegisterForm;
