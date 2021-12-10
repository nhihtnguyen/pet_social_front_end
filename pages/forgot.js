import Link from 'next/link';
import { FiMail, FiLock, FiGithub, FiUser } from 'react-icons/fi';

const Login = () => {
  return (
    <div className='main-wrap'>
      <div className='nav-header bg-transparent shadow-none border-0'>
        <div className='nav-top w-100'>
          <Link href='/'>
            <a>
              <span className='d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0'>
                <span className='display1-size me-2 ms-0'>
                  <FiGithub />
                </span>
                Pet's Friend
              </span>{' '}
            </a>
          </Link>
          <button className='nav-menu me-0 ms-auto'></button>
          <Link href='/login'>
            <a className='header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl'>
              Login
            </a>
          </Link>
          <Link href='/register'>
            <a className='header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl'>
              Register
            </a>
          </Link>
        </div>
      </div>
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
                Change <br />
                your password
              </h2>

              <form>
                <div className='form-group icon-input mb-3'>
                  <input
                    type='Password'
                    className='style2-input ps-5 form-control text-grey-900 font-xss ls-3'
                    placeholder='Old Password'
                  />
                  <span className='font-sm text-grey-500 pe-0'>
                    <FiLock />
                  </span>
                </div>
                <div className='form-group icon-input mb-1'>
                  <input
                    type='Password'
                    className='style2-input ps-5 form-control text-grey-900 font-xss ls-3'
                    placeholder='New Password'
                  />
                  <span className='font-sm text-grey-500 pe-0'>
                    <FiLock />
                  </span>
                </div>
                <div className='form-check text-left mb-3'>
                  <input
                    type='checkbox'
                    className='form-check-input mt-2'
                    id='exampleCheck4'
                  />
                  <label className='form-check-label font-xsss text-grey-500'>
                    Accept Term and Conditions
                  </label>
                </div>
              </form>

              <div className='col-sm-12 p-0 text-left'>
                <div className='form-group mb-1'>
                  <Link href='/login'>
                    <a className='form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 '>
                      Change Password
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
