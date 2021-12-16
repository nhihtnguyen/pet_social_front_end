import Link from 'next/link';
import { LayoutLogin } from 'components/Layout';
import { useRouter } from 'next/router';
import { host as serverHost } from 'config';
import axiosClient from 'axiosSetup';
import RegisterForm from 'components/forms/RegisterForm';
import { useState } from 'react';

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validated) {
      return;
    }

    setLoading(true);

    const body = {
      email: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      const response = await axiosClient.post(`${serverHost}/auth/login`, body);
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        router.push('/');
      } else {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
    }
  };

  return (
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
            <h2 className='fw-700 display1-size display2-md-size mb-4'>
              Create <br />
              your account
            </h2>
            <RegisterForm />

            <div className='col-sm-12 p-0 text-left'>
              <div className='form-group mb-1'>
                <Link href='/register'>
                  <a className='form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 '>
                    Register
                  </a>
                </Link>
              </div>
              <h6 className='text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32'>
                Already have account{' '}
                <Link href='/login'>
                  <a className='fw-700 ms-1'>Login</a>
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.getLayout = function getLayout(page) {
  return <LayoutLogin>{page}</LayoutLogin>;
};

export default Register;
