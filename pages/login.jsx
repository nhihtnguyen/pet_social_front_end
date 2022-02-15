import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutLogin } from 'components/Layout';
import Backdrop from 'components/backdrop/Backdrop';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import LoginForm from 'components/forms/LoginForm';
import { useAuth } from 'app/authContext';

import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
  return (
    <div className='col-sm-12 p-0 text-center mt-2'>
      <h6 className='mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3'>
        Or, Sign in with your social account{' '}
      </h6>
      <div className='form-group mb-1'>
        <span className='d-flex justify-content-center align-items-center style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2'>
          <span
            className='font-xxl bg-white w40 rounded-circle d-flex justify-content-center align-items-center me-2'
            style={{ height: 40 }}
          >
            <FcGoogle />
          </span>{' '}
          Sign in with Google
        </span>
      </div>
    </div>
  );
};

const Login = () => {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const { isAuthenticated, loading, login } = useAuth();
  if (isAuthenticated) {
    router.replace('/');
  }

  const handleLogin = async (data, errors, setErrors) => {
    const email = data.email;
    if (email) {
      login(email);
    }
  };

  return (
    <>
      <div className='row'>
        <div
          className='col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat'
          style={{
            backgroundImage: `url("https://via.placeholder.com/800x950.png")`,
          }}
        ></div>
        <div className='col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden'>
          <div className='card shadow-none border-0 ms-auto me-auto login-card'>
            <div className='card-body rounded-0 text-left'>
              <h2 className='fw-700 display1-size display2-md-size mb-3'>
                Login into <br />
                your account
              </h2>
              <LoginForm onSubmit={handleLogin} validated={validated} />

              <div className='col-sm-12 p-0 text-left'>
                <h6 className='text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32'>
                  Dont have account{' '}
                  <Link href='/register'>
                    <a className='fw-700 ms-1'>Register</a>
                  </Link>
                </h6>
              </div>

              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <Backdrop className='justify-content-center align-items-center'>
          <Spinner className='text-current' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </Backdrop>
      )}
    </>
  );
};

Login.getLayout = function getLayout(page) {
  return <LayoutLogin>{page}</LayoutLogin>;
};

export default Login;
