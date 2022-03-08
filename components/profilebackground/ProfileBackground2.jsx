import Link from 'next/link';
import Image from 'next/image';
import {
  FiMoreHorizontal,
  FiAlertCircle,
  FiLock,
  FiEyeOff,
  FiEdit2,
  FiCheckCircle,
  FiCircle,
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axiosClient from 'axiosSetup';
import { useRouter } from 'next/router';
import { useAuth } from 'app/authContext';
import { Placeholder } from 'react-bootstrap';
import UploadImageButton from 'components/UploadImageButton';

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
  const [extraInfo, setExtraInfo] = useState({});
  const [extraInfoLoading, setExtraInfoLoading] = useState(true);

  useEffect(() => {
    const getExtra = async () => {
      if (profile) {
        axiosClient
          .get(`/pets/${profile.id}/summary`)
          .then((response) => {
            setExtraInfo(response.data);
            setExtraInfoLoading(false);
          })
          .catch((error) => {});
        axiosClient
          .get(`/pets?user_id=${user?.id}`)
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
    };
    getExtra();
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
  const linkToEditPet = () => {
    router.push(`/pet/${profile?.id}/edit`);
  };

  const loading = !profile;

  return (
    <div className='card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl'>
      <div className='card-body h240 p-0 rounded-xxxl d-grid justify-content-center overflow-hidden m-3 position-relative'>
        <Image
          src={
            loading || !profile?.background
              ? 'https://via.placeholder.com/975x250'
              : profile?.background
          }
          alt='background'
          width={975}
          height={250}
          layout='fixed'
        />
        {isOwner && !loading && (
          <UploadImageButton
            style={{ right: 0 }}
            url={`/pets/${profile?.id}/background`}
            id='profile-background'
            className='m-1 top-0 position-absolute rounded-3'
            mutateKey={`/pets/${profile?.id}`}
          />
        )}
      </div>
      <div className='card-body d-block p-0 text-center position-relative'>
        <figure className='avatar mt--6 position-relative w75 z-index-1 w100 z-index-1 ms-auto me-auto'>
          <Image
            width={200}
            height={200}
            src={
              loading || !profile?.avatar
                ? 'https://via.placeholder.com/200'
                : profile?.avatar
            }
            alt='avatar'
            className='p-1 bg-white rounded-xl w-100'
          />
          {isOwner && !loading && (
            <UploadImageButton
              url={`/pets/${profile?.id}/avatar`}
              id='profile-avatar-upload'
              style={{ right: 0 }}
              className='bottom-0 btn-round-md position-absolute'
              mutateKey={`/pets/${profile?.id}`}
            />
          )}
        </figure>

        {loading ? (
          <Placeholder
            as='h4'
            animation='glow'
            className='font-xs ls-1 fw-700 text-grey-900'
          >
            <Placeholder xs={2} />
            <br />
            <Placeholder xs={1} />
          </Placeholder>
        ) : (
          <h4 className='font-xs ls-1 fw-700 text-grey-900'>
            {profile.name || 'Name'}
            <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
              @surfiyazakir22
            </span>
          </h4>
        )}
        {extraInfoLoading ? (
          <Placeholder
            as='h4'
            className='position-absolute left-15 top-0 mt-4 ms-2'
            animation='glow'
            style={{ width: 300 }}
          >
            <Placeholder xs={3} /> <Placeholder xs={3} /> <Placeholder xs={3} />
          </Placeholder>
        ) : (
          <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center pt-0 position-absolute left-15 top-0 mt-lg-4 ms-2'>
            <h4 className='font-xsssss text-lg-center d-lg-block text-grey-500 fw-600 ms-lg-2 me-lg-2'>
              <b className='text-grey-900 mb-1 font-sm fw-700 d-inline-block ls-3 text-dark'>
                {extraInfo?.total_posts || 0}{' '}
              </b>{' '}
              Posts
            </h4>
            <h4 className='font-xsssss text-lg-center d-lg-block text-grey-500 fw-600 ms-lg-2 me-lg-2'>
              <b className='text-grey-900 mb-1 font-sm fw-700 d-inline-block ls-3 text-dark'>
                {extraInfo?.total_followers || 0}{' '}
              </b>{' '}
              Followers
            </h4>
          </div>
        )}
        <div className='d-flex align-items-center justify-content-center position-absolute right-15 top-0 me-2'>
          {!isOwner && !loading && (
            <>
              <a
                onClick={followed ? unfollow : follow}
                className={`${
                  followed ? 'bg-danger' : 'bg-success'
                } d-none cursor-pointer d-lg-block  p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3`}
              >
                {followed ? 'Unfollow' : 'Follow'}
              </a>
              <a
                id='editPet'
                className='d-lg-none font-md cursor-pointer d-block bg-greylight btn-round-sm ms-2 rounded-3 text-grey-700'
                onClick={followed ? unfollow : follow}
              >
                {followed ? <FiCheckCircle /> : <FiCircle />}
              </a>
            </>
          )}
          {isOwner && (
            <>
              <a
                id='editPet'
                className='d-none font-md cursor-pointer d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700'
                onClick={linkToEditPet}
              >
                <FiEdit2 />
              </a>
              <a
                id='editPet'
                className='d-lg-none font-md cursor-pointer d-block bg-greylight btn-round-sm ms-2 rounded-3 text-grey-700'
                onClick={linkToEditPet}
              >
                <FiEdit2 />
              </a>
            </>
          )}
          <a
            id='dropdownMenu4'
            className='d-none font-md cursor-pointer d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700'
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
          id='pills-tab-pet'
          role='tablist'
        >
          <li
            className={`${
              router.pathname == `/pet/[id]` ? 'active ' : ''
            }list-inline-item me-5`}
          >
            <Link href={`/pet/${profile.id}`}>
              <a
                className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                  router.pathname == `/pet/[id]` ? 'active' : ''
                }`}
                data-toggle='tab'
              >
                About
              </a>
            </Link>
          </li>
          <li
            className={`${
              router.pathname == `/pet/[id]/family` ? 'active ' : ''
            }list-inline-item me-5`}
          >
            <Link href={`/pet/${profile?.id}/family`}>
              <a
                className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                  router.pathname == `/pet/[id]/family` ? 'active' : ''
                }`}
                data-toggle='tab'
              >
                Family
              </a>
            </Link>
          </li>
          {/* <li
            className={`${
              router.pathname == `/pet/[id]/events` ? 'active ' : ''
            }list-inline-item me-5`}
          >
            <a
              className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                router.pathname == `/pet/[id]/events` ? 'active' : ''
              }`}
              data-toggle='tab'
            >
              Events
            </a>
          </li> */}
          <li
            className={`${
              router.pathname == `/pet/[id]/following` ? 'active ' : ''
            }list-inline-item me-5`}
          >
            <Link href={`/pet/${profile?.id}/followers`}>
              <a
                className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                  router.pathname == `/pet/[id]/followers` ? 'active' : ''
                }`}
                data-toggle='tab'
              >
                Followers
              </a>
            </Link>
          </li>
          <li
            className={`${
              router.pathname == `/pet/[id]/posts` ? 'active ' : ''
            }list-inline-item me-5`}
          >
            <Link href={`/pet/${profile?.id}/posts`}>
              <a
                className={`fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                  router.pathname == `/pet/[id]/posts` ? 'active' : ''
                }`}
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
