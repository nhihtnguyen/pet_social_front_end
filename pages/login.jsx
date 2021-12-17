import Link from 'next/link';
import Image from 'next/image';
import useForm from 'hooks/useForm';
import { useRouter } from 'next/router';
import { host as serverHost } from 'config';
import axiosClient from 'axiosSetup';
import { LayoutLogin } from 'components/Layout';
import Backdrop from 'components/backdrop/Backdrop';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import LoginForm from 'components/forms/LoginForm';

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    const body = {
      email: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      const response = await axiosClient.post(`${serverHost}/auth/login`, body);
      console.log(response);
      if (response.status === 200) {
        router.push('/');
      } else {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
    } finally {
      setLoading(false);
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
              <div className='col-sm-12 p-0 text-center mt-2'>
                <h6 className='mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3'>
                  Or, Sign in with your social account{' '}
                </h6>
                <div className='form-group mb-1'>
                  <Link href='/register'>
                    <a className='d-flex text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2'>
                      <div
                        className={`d-flex justify-content-center image-container ms-2 w40 me-5`}
                      >
                        <Image
                          layout='fill'
                          src='/assets/images/icon-1.png'
                          alt='icon'
                          className='image'
                        />
                      </div>{' '}
                      Sign in with Google
                    </a>
                  </Link>
                </div>
                <div className='form-group mb-1'>
                  <Link href='/register'>
                    <a className='d-flex text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2 pe-2'>
                      <div
                        className={`d-flex justify-content-center image-container ms-2 w40 me-5`}
                      >
                        <Image
                          layout='fill'
                          src='/assets/images/icon-3.png'
                          alt='icon'
                          className='image'
                        />
                      </div>{' '}
                      Sign in with Facebook
                    </a>
                  </Link>
                </div>
              </div>
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
