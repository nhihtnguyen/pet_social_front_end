import { Fragment } from 'react';
import Header from 'components/header/Header';
import LeftNav from 'components/leftnav/LeftNav';
import PageTitle from 'components/pagetitle/PageTitle';
import RightNav from 'components/rightnav/RightNav';

const Layout = ({ children }) => {
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

export default Layout;
