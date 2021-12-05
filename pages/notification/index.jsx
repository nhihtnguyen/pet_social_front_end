import { Fragment } from 'react';
import Header from '../../components/header/Header';
import LeftNav from '../../components/leftnav/LeftNav';
import NotificationBanner from '../../components/notificationbanner/NotificationBanner';
import RightNav from '../../components/rightnav/RightNav';

const Notification = () => {
  return (
    <Fragment>
      <Header />
      <LeftNav />
      <RightNav />

      <div className='main-content theme-dark-bg right-chat-active'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='chat-wrapper p-3 w-100 position-relative scroll-bar bg-white theme-dark-bg'>
                  <h2 className='fw-700 mb-4 mt-2 font-md text-grey-900 d-flex align-items-center'>
                    Notification
                    <span className='circle-count bg-warning text-white font-xsssss rounded-3 ms-2 ls-3 fw-600 p-2  mt-0'>
                      23
                    </span>
                    <a
                      href='/defaultnotification'
                      className='ms-auto btn-round-sm bg-greylight rounded-3'
                    >
                      <i className='feather-hard-drive font-xss text-grey-500'></i>
                    </a>
                    <a
                      href='/defaultnotification'
                      className='ms-2 btn-round-sm bg-greylight rounded-3'
                    >
                      <i className='feather-alert-circle font-xss text-grey-500'></i>
                    </a>
                    <a
                      href='/defaultnotification'
                      className='ms-2 btn-round-sm bg-greylight rounded-3'
                    >
                      <i className='feather-trash-2 font-xss text-grey-500'></i>
                    </a>
                  </h2>

                  <ul className='notification-box'>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                    <li>
                      <NotificationBanner />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Notification;
