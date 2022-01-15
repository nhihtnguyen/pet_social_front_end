import Link from 'next/link';
import { Navbar } from 'react-bootstrap';
import LeftNav from 'components/leftnav/LeftNav';
import {
  FiGithub,
  FiSearch,
  FiMessageCircle,
  FiMessageSquare,
  FiBell,
} from 'react-icons/fi';
import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DarkModeToggle from 'components/DarkModeToggle';
import {
  Typeahead,
  Menu,
  MenuItem,
  TypeaheadMenu,
  Highlighter,
} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const options = [
  {
    label: 'Alakazam',
    property: '',
  },
  {
    label: 'Ralts',
    property: '',
  },
  {
    label: 'Lucario',
    property: '',
  },
];

const NotificationSection = ({ notificationClass }) => (
  <div
    className={`dropdown-menu p-4 right-0 rounded-xxl border-0 shadow-lg ${notificationClass}`}
    aria-labelledby='dropdownMenu3'
    style={{ top: 100, margin: 10 }}
  >
    <h4 className='fw-700 font-xss mb-4'>Notification</h4>
    <div className='card bg-transparent-card w-100 border-0 ps-5 mb-3'>
      <img
        src='assets/images/user.png'
        alt='user'
        className='w40 position-absolute left-0'
      />
      <h5 className='font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block'>
        Hendrix Stamp{' '}
        <span className='text-grey-400 font-xsssss fw-600 float-right mt-1'>
          {' '}
          3 min
        </span>
      </h5>
      <h6 className='text-grey-500 fw-500 font-xssss lh-4'>
        There are many variations of pass..
      </h6>
    </div>
    <div className='card bg-transparent-card w-100 border-0 ps-5 mb-3'>
      <img
        src='assets/images/user.png'
        alt='user'
        className='w40 position-absolute left-0'
      />
      <h5 className='font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block'>
        Goria Coast{' '}
        <span className='text-grey-400 font-xsssss fw-600 float-right mt-1'>
          {' '}
          2 min
        </span>
      </h5>
      <h6 className='text-grey-500 fw-500 font-xssss lh-4'>
        Mobile Apps UI Designer is require..
      </h6>
    </div>

    <div className='card bg-transparent-card w-100 border-0 ps-5 mb-3'>
      <img
        src='assets/images/user.png'
        alt='user'
        className='w40 position-absolute left-0'
      />
      <h5 className='font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block'>
        Surfiya Zakir{' '}
        <span className='text-grey-400 font-xsssss fw-600 float-right mt-1'>
          {' '}
          1 min
        </span>
      </h5>
      <h6 className='text-grey-500 fw-500 font-xssss lh-4'>
        Mobile Apps UI Designer is require..
      </h6>
    </div>
    <div className='card bg-transparent-card w-100 border-0 ps-5'>
      <img
        src='assets/images/user.png'
        alt='user'
        className='w40 position-absolute left-0'
      />
      <h5 className='font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block'>
        Victor Exrixon{' '}
        <span className='text-grey-400 font-xsssss fw-600 float-right mt-1'>
          {' '}
          30 sec
        </span>
      </h5>
      <h6 className='text-grey-500 fw-500 font-xssss lh-4'>
        Mobile Apps UI Designer is require..
      </h6>
    </div>
  </div>
);

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState([]);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword != '' && keyword) {
      router.push(`/explore?search=${keyword}`);
    }
  };
  let timerid;
  const [isOpenLeftNav, setIsOpenLeftNav] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const navClass = `${isOpenLeftNav ? ' nav-active' : ''}`;
  const searchClass = `${isOpenSearch ? ' show' : ''}`;
  const notificationClass = `${isOpenNotification ? ' show' : ''}`;

  const toggleLeftNav = () => setIsOpenLeftNav(!isOpenLeftNav);
  const toggleSearch = () => setIsOpenSearch(!isOpenSearch);
  const toggleNotification = () => setIsOpenNotification(!isOpenNotification);

  return (
    <div
      className='nav-header bg-white shadow-xs border-0'
      style={{ zIndex: '1000' }}
    >
      <div className='nav-top'>
        <Link href='/'>
          <a>
            <span className='d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0'>
              <i className='display2-size me-3 ms-0'>
                <FiGithub />
              </i>
              Pet's Friend
            </span>
          </a>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className='float-left header-search ms-3'>
        <div className='form-group mb-0 icon-input'>
          <span className='font-sm text-grey-400' style={{ zIndex: 100 }}>
            <FiSearch />
          </span>
          <Typeahead
            minLength={1}
            id='basic-typeahead-single'
            labelKey='label'
            onChange={(selected) => {
              setSelected(selected);
              if (selected) {
                setKeyword(selected[0]?.label);
              }
            }}
            options={options}
            placeholder='Start typing to search...'
            selected={selected}
            onInputChange={(text, e) => setKeyword(text)}
            onKeyDown={(e) => {
              // Submit the form when the user hits enter.
              if (e.key === 'Enter') {
                if (timerid) {
                  clearTimeout(timerid);
                }
                timerid = setTimeout(() => {
                  handleSubmit(e);
                }, 300);
              }
            }}
            inputProps={{
              style: { zIndex: 99 },
              className:
                'bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg',
            }}
            renderMenu={(results, menuProps, state) => (
              <Menu
                {...menuProps}
                style={{
                  width: '100%',
                  marginTop: 10,
                  borderRadius: 30,
                  zIndex: 98,
                }}
                className='bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg'
              >
                {results.map((result, index) => (
                  <MenuItem option={result} position={index} key={index}>
                    <Highlighter search={state.text}>
                      {result.label}
                    </Highlighter>
                  </MenuItem>
                ))}
              </Menu>
            )}
          />
        </div>
      </form>

      <span
        className={`p-2 cursor-pointer text-center ms-auto menu-icon ${notificationClass}`}
        id='dropdownMenu3'
        data-bs-toggle='dropdown'
        aria-expanded='false'
        onClick={toggleNotification}
      >
        <span className='dot-count bg-warning' style={{ top: 10 }} />
        <span className='font-xl text-current'>
          <FiBell />
        </span>
      </span>
      <NotificationSection notificationClass={notificationClass} />

      <Link href='/message'>
        <a className='p-2 text-center ms-3 menu-icon chat-active-btn'>
          <span className='font-xl text-current'>
            <FiMessageSquare />
          </span>
        </a>
      </Link>
      <DarkModeToggle />
      <Link href='/settings'>
        <a className='p-0 ms-3 menu-icon'>
          <img
            src='assets/images/user.png'
            alt='user'
            className='w40 mt--1 rounded-circle'
          />
        </a>
      </Link>

      <LeftNav className={`scroll-bar ${navClass}`} />

      <div className={`app-header-search ${searchClass}`}>
        <form className='search-form'>
          <div className='form-group searchbox mb-0 border-0 p-1'>
            <input
              type='text'
              className='form-control border-0'
              placeholder='Search...'
            />
            <i className='input-icon'>
              <ion-icon
                name='search-outline'
                role='img'
                className='md hydrated'
                aria-label='search outline'
              ></ion-icon>
            </i>
            <span className='ms-1 mt-1 d-inline-block close searchbox-close'>
              <i className='ti-close font-xs' onClick={toggleSearch}></i>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
