import Link from 'next/link';
import LeftNav from 'components/leftnav/LeftNav';
import {
  FiGithub,
  FiSearch,
  FiMessageSquare,
  FiBell,
  FiX,
} from 'react-icons/fi';
import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DarkModeToggle from 'components/DarkModeToggle';
import {
  Typeahead,
  Menu,
  MenuItem,
  Highlighter,
} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Image from 'next/image';
import { useAuth } from 'app/authContext';

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
    className={`dropdown-notification dropdown-menu mt-1 me-3 p-4 right-0 rounded-xxl border-0 shadow-lg ${notificationClass}`}
    aria-labelledby='dropdownMenu3'
    style={{ top: '100%' }}
  >
    <h4 className='fw-700 font-xss mb-4'>Notification</h4>
    <div className='card bg-transparent-card w-100 border-0 ps-5 mb-3'>
      <span className='position-absolute left-0 overflow rounded-circle'>
        <Image
          src='https://via.placeholder.com/40'
          width={40}
          height={40}
          alt='user'
          className='rounded-circle'
        />
      </span>

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
      <span className='position-absolute left-0 overflow rounded-circle'>
        <Image
          src='https://via.placeholder.com/40'
          width={40}
          height={40}
          alt='user'
          className='rounded-circle'
        />
      </span>
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
      <span className='position-absolute left-0 overflow rounded-circle'>
        <Image
          src='https://via.placeholder.com/40'
          width={40}
          height={40}
          alt='user'
          className='rounded-circle'
        />
      </span>
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
      <span className='position-absolute left-0 overflow rounded-circle'>
        <Image
          src='https://via.placeholder.com/40'
          width={40}
          height={40}
          alt='user'
          className='rounded-circle'
        />
      </span>
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
  const { user, loading } = useAuth();
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
  const buttonClass = `${isOpenLeftNav ? ' active' : ''}`;

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
              <span className='display2-size me-3 ms-0'>
                <FiGithub />
              </span>
              Pet's Friend
            </span>
          </a>
        </Link>

        <span
          onClick={toggleSearch}
          className='ms-auto me-2 menu-search-icon mob-menu'
        >
          <span className='text-grey-900 font-sm btn-round-md bg-greylight'>
            <FiSearch />
          </span>
        </span>
        <button
          onClick={toggleLeftNav}
          className={`nav-menu me-0 ms-2 ${buttonClass}`}
        ></button>
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
          <Image
            src={user?.avatar || 'https://via.placeholder.com/40'}
            alt='user'
            className='rounded-circle'
            width={40}
            height={40}
          />
        </a>
      </Link>

      <LeftNav className={`scroll-bar ${navClass}`} />

      <div className={`app-header-search bg-transparent  ${searchClass}`}>
        <form className='search-form bg-transparent'>
          <div className='form-group searchbox mb-0 border-0 p-1 bg-transparent'>
            <input
              type='text'
              className='form-control border-0'
              placeholder='Search...'
            />

            <span className='ms-1 mt-1 d-inline-block close searchbox-close'>
              <span className='font-xs' onClick={toggleSearch}>
                <FiX />
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
