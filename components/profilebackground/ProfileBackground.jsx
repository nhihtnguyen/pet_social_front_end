import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiMoreHorizontal } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { FiCamera, FiAlertCircle, FiLock, FiEyeOff } from 'react-icons/fi';
import axiosClient from 'axiosSetup';
import { useAuth } from 'app/authContext';
import { useRouter } from 'next/router';
import { Card, Figure } from 'react-bootstrap';

const MenuItem = ({ icon, tooltip, label, className, onClick, ...props }) => (
  <div
    className={`${className} card-body p-0 d-flex cursor-pointer`}
    onClick={onClick}
    {...props}
  >
    <span className='d-flex text-grey-500 me-3 font-lg'>{icon}</span>
    <h4 className='fw-600 text-grey-900 font-xssss mt-0 me-0'>
      {label}
      <span className='d-block font-xsssss fw-500 mt-1 ms-1 lh-3 text-grey-500'>
        {tooltip}
      </span>
    </h4>
  </div>
);

const MoreActionMenu = ({ toggleMore }) => (
  <div
    className={`${
      toggleMore ? 'show' : ''
    } dropdown-more-menu dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg top-100`}
    style={{ right: 0, width: 'max-content' }}
    aria-labelledby='dropdownMenu4'
  >
    <MenuItem
      icon={<FiAlertCircle />}
      label='Report'
      tooltip={'Report negative behavior'}
    />
    <MenuItem
      icon={<FiLock />}
      label='Block'
      tooltip={'Dismiss all interaction'}
      className='mt-2'
    />
    <MenuItem
      icon={<FiEyeOff />}
      label='Hide posts'
      tooltip={'Hide all posts'}
      className='mt-2'
    />
  </div>
);

const ProfileBackground = ({ profile, isLoading, className, id }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [userID, setUserID] = useState(false);
  const [toggleMore, setToggleMore] = useState(false);
  const isOwner = user?.id === profile.id;

  const handleUploadImage = (name) => async (e) => {
    let file = e.target.files[0];

    const data = new FormData();
    data.append('image', file);
    let result;
    try {
      result = await axiosClient.put(`/users/${name}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (result) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (profile) {
      setUserID(profile.id);
    }
  }, [profile]);

  return (
    <Card className='w-100 border-0 p-0 bg-white shadow-xss rounded-xxl'>
      <Card.Body className='h250 p-0 rounded-xxxl overflow-hidden m-3 position-relative'>
        <Image
          width={875}
          height={250}
          src={profile?.background || 'https://via.placeholder.com/875x250'}
          alt='background'
          layout='responsive'
        />
        {isOwner && (
          <label
            htmlFor='file-background'
            className='top-0 m-1 font-md cursor-pointer position-absolute border-0 d-lg-block bg-greylight btn-round-lg rounded-3 text-grey-700'
            style={{ right: 0 }}
          >
            <FiCamera />

            <input
              id='file-background'
              className='d-none'
              type='file'
              onChange={handleUploadImage('background')}
            />
          </label>
        )}
      </Card.Body>
      <Card.Body className='p-0 position-relative'>
        <Figure
          className='avatar position-absolute'
          style={{
            top: '-45px',
            left: '30px',
          }}
        >
          <Image
            src={profile?.avatar || 'https://via.placeholder.com/100'}
            alt='avatar'
            width={100}
            height={100}
            className='p-1 bg-white rounded-circle bg-opacity-75'
          />
          {isOwner && (
            <label
              htmlFor='file-avatar'
              style={{ right: 0 }}
              className='bottom-0 cursor-pointer position-absolute border-0 d-lg-block bg-greylight btn-round-md  text-grey-700'
            >
              <FiCamera />
              <input
                id='file-avatar'
                className='d-none'
                type='file'
                onChange={handleUploadImage('avatar')}
              />
            </label>
          )}
        </Figure>
        <h4 className='fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15'>
          {profile ? `${profile?.first_name} ${profile?.last_name} ` : 'Name'}
          <span className='fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block'>
            {profile?.email || '@name'}
          </span>
        </h4>
        <div className='d-flex align-items-center justify-content-center position-absolute right-15 top-0 me-2'>
          <Link href='/defaultemailbox'>
            <a className='font-md d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700'>
              <FiMail />
            </a>
          </Link>
          <a
            id='dropdownMenu4'
            className='font-md cursor-pointer d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
            onClick={() => setToggleMore(!toggleMore)}
          >
            <FiMoreHorizontal />
          </a>
          <MoreActionMenu toggleMore={toggleMore} />
        </div>
      </Card.Body>

      <div className='card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs'>
        <ul
          className='nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4'
          id='pills-tab'
          role='tablist'
        >
          <li
            className={`${
              router.pathname == `/user/[id]` ? 'active ' : ''
            }list-inline-item me-5`}
          >
            <Link href={`/user/${userID}`}>
              <a
                className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                  router.pathname == `/user/[id]` ? 'active' : ''
                }`}
                data-toggle='tab'
              >
                About
              </a>
            </Link>
          </li>
          <li
            className={`${
              router.pathname == `/user/[id]/family` ? 'active ' : ''
            }list-inline-item me-5`}
          >
            <Link href={`/user/${userID}/family`}>
              <a
                className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                  router.pathname == `/user/[id]/family` ? 'active' : ''
                }`}
                data-toggle='tab'
              >
                Family
              </a>
            </Link>
          </li>
          <li
            className={`${
              router.pathname == `/user/[id]/events` ? 'active ' : ''
            }list-inline-item me-5`}
          >
            <a
              className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                router.pathname == `/user/[id]/events` ? 'active' : ''
              }`}
              data-toggle='tab'
            >
              Events
            </a>
          </li>
          <li
            className={`${
              router.pathname == `/user/[id]/following` ? 'active ' : ''
            }list-inline-item me-5`}
          >
            <Link href={`/user/${userID}/following`}>
              <a
                className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                  router.pathname == `/user/[id]/following` ? 'active' : ''
                }`}
                data-toggle='tab'
              >
                Following
              </a>
            </Link>
          </li>
          <li
            className={`${
              router.pathname == `/user/[id]/posts` ? 'active ' : ''
            }list-inline-item me-5`}
          >
            <Link href={`/user/${userID}/posts`}>
              <a
                className={`fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                  router.pathname == `/user/[id]/posts` ? 'active' : ''
                }`}
                data-toggle='tab'
              >
                Posts
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default ProfileBackground;
