import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiMoreHorizontal } from 'react-icons/fi';

const ProfileBackground = ({ profile }) => {
  return (
    <div className='card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl'>
      <div className='card-body h240 p-0 rounded-xxxl overflow-hidden m-3'>
        <div className={`image-container`}>
          <Image
            className={`image`}
            src={profile.background ? profile.background : '/'}
            alt='background'
            layout='fill'
          />
        </div>
      </div>
      <div className='card-body d-block p-0 text-center position-relative'>
        <figure className='avatar mt--6 position-relative w75 z-index-1 w100 z-index-1 ms-auto me-auto'>
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
          <Link href='/defaultmember'>
            <a className='d-none d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3'>
              Add Friend
            </a>
          </Link>
          <Link href='/defaultemailbox'>
            <a className='d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700'>
              <i className='font-md'>
                <FiMail />
              </i>
            </a>
          </Link>
          <Link href='#'>
            <a
              id='dropdownMenu4'
              className='d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <i className='font-md text-dark'>
                <FiMoreHorizontal />
              </i>
            </a>
          </Link>
          <div
            className='dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg'
            aria-labelledby='dropdownMenu4'
          >
            <div className='card-body p-0 d-flex'>
              <i className='feather-bookmark text-grey-500 me-3 font-lg'></i>
              <h4 className='fw-600 text-grey-900 font-xssss mt-0 me-0'>
                Save Link{' '}
                <span className='d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500'>
                  Add this to your saved items
                </span>
              </h4>
            </div>
            <div className='card-body p-0 d-flex mt-2'>
              <i className='feather-alert-circle text-grey-500 me-3 font-lg'></i>
              <h4 className='fw-600 text-grey-900 font-xssss mt-0 me-0'>
                Hide Post{' '}
                <span className='d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500'>
                  Save to your saved items
                </span>
              </h4>
            </div>
            <div className='card-body p-0 d-flex mt-2'>
              <i className='feather-alert-octagon text-grey-500 me-3 font-lg'></i>
              <h4 className='fw-600 text-grey-900 font-xssss mt-0 me-0'>
                Hide all from Group{' '}
                <span className='d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500'>
                  Save to your saved items
                </span>
              </h4>
            </div>
            <div className='card-body p-0 d-flex mt-2'>
              <i className='feather-lock text-grey-500 me-3 font-lg'></i>
              <h4 className='fw-600 mb-0 text-grey-900 font-xssss mt-0 me-0'>
                Unfollow Group{' '}
                <span className='d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500'>
                  Save to your saved items
                </span>
              </h4>
            </div>
          </div>
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
              href='#navtabs1'
              data-toggle='tab'
            >
              Followers
            </a>
          </li>
          <li className='list-inline-item me-5'>
            <Link href='/pet/1/posts'>
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
