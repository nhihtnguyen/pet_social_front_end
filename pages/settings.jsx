import Layout from 'components/Layout';
import Link from 'next/link';
import {
  FiHome,
  FiChevronRight,
  FiBell,
  FiCreditCard,
  FiLock,
  FiHelpCircle,
  FiLogOut,
} from 'react-icons/fi';
import { useAuth } from 'app/authContext';

const Settings = () => {
  const { isAuthenticated, loading, logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <div className='middle-wrap pe-2'>
      <div className='card w-100 border-0 bg-white shadow-xss p-0 mb-4 rounded-xxl'>
        <div className='card-body p-lg-5 p-4 w-100 border-0'>
          <div className='row'>
            <div className='col-lg-12'>
              <h4 className='mb-4 font-xxl fw-700 mont-font mb-lg-5 mb-4 font-md-xs'>
                Settings
              </h4>
              <div className='nav-caption fw-600 font-xssss text-grey-500 mb-2'>
                Genaral
              </div>
              <ul className='list-inline mb-4'>
                <li className='list-inline-item d-block border-bottom me-0'>
                  <Link href='/accountinformation'>
                    <a className='pt-2 pb-2 d-flex align-items-center'>
                      <span className='btn-round-md bg-primary-gradient text-white font-md me-3'>
                        <FiHome />
                      </span>{' '}
                      <h4 className='fw-600 font-xsss mb-0 mt-0'>
                        Acount Information
                      </h4>
                      <span className='font-xsss text-grey-500 ms-auto mt-3'>
                        <FiChevronRight />
                      </span>
                    </a>
                  </Link>
                </li>

                <li className='list-inline-item d-block me-0'>
                  <Link href='/notifications'>
                    <a className='pt-2 pb-2 d-flex align-items-center'>
                      <span className='btn-round-md bg-red-gradient text-white font-md me-3'>
                        <FiBell />
                      </span>{' '}
                      <h4 className='fw-600 font-xsss mb-0 mt-0'>
                        Notification
                      </h4>
                      <span className='font-xsss text-grey-500 ms-auto mt-3'>
                        <FiChevronRight />
                      </span>
                    </a>
                  </Link>
                </li>
              </ul>

              <div className='nav-caption fw-600 font-xsss text-grey-500 mb-2'>
                Account
              </div>
              <ul className='list-inline mb-4'>
                <li className='list-inline-item d-block border-bottom me-0'>
                  <Link href='/wallet'>
                    <a className='pt-2 pb-2 d-flex align-items-center'>
                      <span className='btn-round-md bg-mini-gradient text-white font-md me-3'>
                        <FiCreditCard />
                      </span>{' '}
                      <h4 className='fw-600 font-xsss mb-0 mt-0'>Wallet</h4>
                      <span className='font-xsss text-grey-500 ms-auto mt-3'>
                        <FiChevronRight />
                      </span>
                    </a>
                  </Link>
                </li>
                <li className='list-inline-item d-block  me-0'>
                  <Link href='/password'>
                    <a className='pt-2 pb-2 d-flex align-items-center'>
                      <span className='btn-round-md bg-blue-gradient text-white font-md me-3'>
                        <FiLock />
                      </span>{' '}
                      <h4 className='fw-600 font-xsss mb-0 mt-0'>Password</h4>
                      <span className='font-xsss text-grey-500 ms-auto mt-3'>
                        <FiChevronRight />
                      </span>
                    </a>
                  </Link>
                </li>
              </ul>

              <div className='nav-caption fw-600 font-xsss text-grey-500 mb-2'>
                Other
              </div>
              <ul className='list-inline'>
                <li className='list-inline-item d-block border-bottom me-0'>
                  <Link href='/help'>
                    <a className='pt-2 pb-2 d-flex align-items-center'>
                      <span className='btn-round-md bg-primary-gradient text-white font-md me-3'>
                        <FiHelpCircle />
                      </span>{' '}
                      <h4 className='fw-600 font-xsss mb-0 mt-0'>Help</h4>
                      <span className='font-xsss text-grey-500 ms-auto mt-3'>
                        <FiChevronRight />
                      </span>
                    </a>
                  </Link>
                </li>
                <li className='list-inline-item d-block me-0'>
                  <a
                    className='pt-2 pb-2 d-flex align-items-center cursor-pointer'
                    onClick={handleLogout}
                  >
                    <span className='btn-round-md bg-red-gradient text-white font-md me-3'>
                      <FiLogOut />
                    </span>{' '}
                    <h4 className='fw-600 font-xsss mb-0 mt-0'>Logout</h4>
                    <span className='font-xsss text-grey-500 ms-auto mt-3'>
                      <FiChevronRight />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Settings;
