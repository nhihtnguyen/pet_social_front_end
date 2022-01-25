import Link from 'next/link';
import Image from 'next/image';
import {
  FiMoreHorizontal,
  FiAlertCircle,
  FiLock,
  FiEyeOff,
  FiCamera,
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axiosClient from 'axiosSetup';
import { useRouter } from 'next/router';
import { useAuth } from 'app/authContext';

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

const ProfileBackground = ({ profile }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState(false);

  const [followed, setFollowed] = useState(false);
  const [toggleMore, setToggleMore] = useState(false);

  useEffect(() => {
    if (profile) {
      axiosClient
        .get(`/pets?user_id=${user.id}`)
        .then((response) => {
          if (response?.data) {
            setIsOwner(!response.data.every((pet) => pet.id !== profile.id));
          }
        })
        .catch((error) => {});
      axiosClient
        .get(`/following/${profile.id}`)
        .then((response) => {
          if (response.data.pet_id === profile.id) {
            setFollowed(true);
          }
        })
        .catch((error) => {});
    }
  }, [profile]);

  const follow = async () => {
    try {
      setFollowed(true);
      await axiosClient.post(`/following/follow`, { pet_id: profile.id });
    } catch (error) {
      console.log(error);
    }
  };
  const unfollow = async () => {
    try {
      setFollowed(false);
      await axiosClient.post(`/following/unfollow`, { pet_id: profile.id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = (name) => async (e) => {
    let file = e.target.files[0];

    const data = new FormData();
    data.append('image', file);
    let result;
    try {
      result = await axiosClient.put(`/pets/${name}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (result) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl'>
      <div className='card-body h240 p-0 rounded-xxxl overflow-hidden m-3 position-relative'>
        <Image
          src={profile.background || 'https://via.placeholder.com/875x250'}
          alt='background'
          width={875}
          height={250}
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
      </div>
      <div className='card-body d-block p-0 text-center position-relative'>
        <figure className='avatar mt--6 position-relative w75 z-index-1 w100 z-index-1 ms-auto me-auto'>
          <Image
            width={200}
            height={200}
            src={profile.avatar || 'https://via.placeholder.com/200'}
            alt='avatar'
            className='p-1 bg-white rounded-xl w-100'
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
        </figure>

        <h4 className='font-xs ls-1 fw-700 text-grey-900'>
          {profile.name || 'Name'}
          <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
            @surfiyazakir22
          </span>
        </h4>
        <div className='d-flex align-items-center pt-0 position-absolute left-15 top-0 mt-4 ms-2'>
          <h4 className='font-xsssss text-center d-none d-lg-block text-grey-500 fw-600 ms-2 me-2'>
            <b className='text-grey-900 mb-1 font-sm fw-700 d-inline-block ls-3 text-dark'>
              456{' '}
            </b>{' '}
            Posts
          </h4>
          <h4 className='font-xsssss text-center d-none d-lg-block text-grey-500 fw-600 ms-2 me-2'>
            <b className='text-grey-900 mb-1 font-sm fw-700 d-inline-block ls-3 text-dark'>
              2.1k{' '}
            </b>{' '}
            Followers
          </h4>
          <h4 className='font-xsssss text-center d-none d-lg-block text-grey-500 fw-600 ms-2 me-2'>
            <b className='text-grey-900 mb-1 font-sm fw-700 d-inline-block ls-3 text-dark'>
              32k{' '}
            </b>{' '}
            Follow
          </h4>
        </div>
        <div className='d-flex align-items-center justify-content-center position-absolute right-15 top-0 me-2'>
          {!isOwner &&
            (followed ? (
              <a
                onClick={unfollow}
                className='d-none cursor-pointer d-lg-block bg-danger p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3'
              >
                Unfollow
              </a>
            ) : (
              <a
                onClick={follow}
                className='d-none cursor-pointer d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3'
              >
                Follow
              </a>
            ))}

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
      </div>

      <div className='card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs'>
        <ul
          className='nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4'
          id='pills-tab'
          role='tablist'
        >
          <li className='active list-inline-item me-5'>
            <Link href='/pet/1'>
              <a
                className='fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active'
                data-toggle='tab'
              >
                About
              </a>
            </Link>
          </li>
          <li className='list-inline-item me-5'>
            <Link href='/pet/1/family'>
              <a
                className='fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block'
                data-toggle='tab'
              >
                Family
              </a>
            </Link>
          </li>
          <li className='list-inline-item me-5'>
            <a
              className='fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block'
              href='#navtabs1'
              data-toggle='tab'
            >
              Events
            </a>
          </li>
          <li className='list-inline-item me-5'>
            <a
              className='fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block'
              href='/pet/1/follower'
              data-toggle='tab'
            >
              Followers
            </a>
          </li>
          <li className='list-inline-item me-5'>
            <Link href='/posts'>
              <a
                className='fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block'
                data-toggle='tab'
              >
                Posts
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileBackground;
