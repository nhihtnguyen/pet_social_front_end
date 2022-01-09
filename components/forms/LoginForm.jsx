import Input from 'components/controls/Input';
import Check from 'components/controls/Check';
import { Form } from 'react-bootstrap';
import { FiMail, FiLock, FiGithub } from 'react-icons/fi';
import Link from 'next/link';

const LoginForm = ({ onSubmit, validated }) => {
  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
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
        className='mb-1'
        inputClassName='style2-input ps-5'
        placeholder='Password'
        startIcon={<FiLock />}
        required
      />

      <div className='d-flex text-left mb-3'>
        <Check
          label={`Remember me`}
          labelClassName='font-xssss text-grey-500'
        />
        <Link href='/forgot'>
          <a className='fw-600 font-xssss text-grey-700 mt-1 ms-auto'>
            Forgot your Password?
          </a>
        </Link>
      </div>

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
