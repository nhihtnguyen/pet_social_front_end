import Link from 'next/link';
import { FiGithub, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import Image from 'next/image';

const EventCard = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div
      className='card shadow-xss p-0 rounded-xxl overflow-hidden border-0 hover-overlay hover-shadow'
      style={{ width: 236 }}
      onMouseEnter={() => setToggle(false)}
      onMouseLeave={() => setToggle(true)}
    >
      <div
        className={`${
          toggle ? 'd-block' : 'd-none'
        } bg-image-cover bg-image-center w-100 h-100 position-absolute bg-white`}
        style={{
          backgroundImage: `url("https://picsum.photos/300/430")`,
          zIndex: 11,
        }}
      ></div>
      <div>
        <div className='card-body d-block pt-4 text-center'>
          <figure className='avatar mt-6 position-relative w75 z-index-1 w100 z-index-1 ms-auto me-auto'>
            <div className={`image-container`}>
              <Image
                layout='fill'
                src='https://picsum.photos/200'
                alt='avatar'
                className='image p-1 bg-white rounded-xl w-100'
              />
            </div>
          </figure>
          <h4 className='font-xs ls-1 fw-700 text-grey-900'>
            Surfiya Zakir{' '}
            <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
              @surfiyazakir22
            </span>
          </h4>
        </div>
        <div className='card-body d-flex align-items-center ps-4 pe-4 pt-0'>
          <h4 className='font-xsssss text-center text-grey-500 fw-600 ms-2 me-2'>
            <b className='text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark'>
              456{' '}
            </b>{' '}
            Posts
          </h4>
          <h4 className='font-xsssss text-center text-grey-500 fw-600 ms-2 me-2'>
            <b className='text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark'>
              2.1k{' '}
            </b>{' '}
            Followers
          </h4>
          <h4 className='font-xsssss text-center text-grey-500 fw-600 ms-2 me-2'>
            <b className='text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark'>
              32k{' '}
            </b>{' '}
            Follow
          </h4>
        </div>
        <div className='card-body d-flex align-items-center justify-content-center ps-4 pe-4 pt-0'>
          <Link href='/'>
            <a className='bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3'>
              Vote
            </a>
          </Link>
          <Link href='/'>
            <a className='bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700'>
              <i className='font-md'>
                <FiGithub />
              </i>
            </a>
          </Link>
          <Link href='/'>
            <a className='bg-greylight theme-white-bg btn-round-lg ms-2 rounded-3 text-grey-700'>
              <i className='font-md'>
                <FiUser />
              </i>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
