import { Fragment } from 'react';
import Header from 'components/header/Header';
import LeftNav from 'components/leftnav/LeftNav';
import PageTitle from 'components/pagetitle/PageTitle';
import RightNav from 'components/rightnav/RightNav';
import ProfileBackground2 from './profilebackground/ProfileBackground2';
import ProfileBackground from './profilebackground/ProfileBackground';
import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <LeftNav />

      <div className='main-content'>
        <div className='middle-sidebar-bottom pt-3 pb-1'>
          <div className='middle-sidebar-left pe-0'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export const LayoutLogin = ({ children }) => {
  return (
    <div className='main-wrap'>
      <div className='nav-header bg-transparent shadow-none border-0'>
        <div className='nav-top w-100'>
          <Link href='/'>
            <a>
              <span className='d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0'>
                <i className='display1-size me-2 ms-0'>
                  <FiGithub />
                </i>
                Pet's Friend
              </span>{' '}
            </a>
          </Link>
          <button className='nav-menu me-0 ms-auto' />
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
      {children}
    </div>
  );
};

export const LayoutProfile = ({ children, profileBackgroundComponent }) => {
  return (
    <div className='row w-100 justify-content-center'>
      <div className='col-12 mb-3 pe-0' style={{ maxWidth: 1000 }}>
        <profileBackgroundComponent profile={user} />
      </div>
      {children}
    </div>
  );
};

export default Layout;
