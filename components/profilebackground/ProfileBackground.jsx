import Link from "next/link";
import Image from "next/image";
import { FiMail, FiMoreHorizontal } from "react-icons/fi";
const ProfileBackground = () => {
  return (
    <div className='card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl'>
      <div className='card-body h250 p-0 rounded-xxl overflow-hidden m-3'>
        <img src={"https://picsum.photos/928/250"} alt='avatar' />
      </div>
      <div className='card-body p-0 position-relative'>
        <figure
          className='avatar position-absolute w100 z-index-1'
          style={{ top: "-40px", left: "30px" }}
        >
          <img
            src={"https://picsum.photos/200"}
            alt='avater'
            className='float-right p-1 bg-white rounded-circle w-100'
          />
        </figure>
        <h4 className='fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15'>
          Mohannad Zitoun{" "}
          <span className='fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block'>
            support@gmail.com
          </span>
        </h4>
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
              <i className='font-md tetx-dark'>
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
                Save Link{" "}
                <span className='d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500'>
                  Add this to your saved items
                </span>
              </h4>
            </div>
            <div className='card-body p-0 d-flex mt-2'>
              <i className='feather-alert-circle text-grey-500 me-3 font-lg'></i>
              <h4 className='fw-600 text-grey-900 font-xssss mt-0 me-0'>
                Hide Post{" "}
                <span className='d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500'>
                  Save to your saved items
                </span>
              </h4>
            </div>
            <div className='card-body p-0 d-flex mt-2'>
              <i className='feather-alert-octagon text-grey-500 me-3 font-lg'></i>
              <h4 className='fw-600 text-grey-900 font-xssss mt-0 me-0'>
                Hide all from Group{" "}
                <span className='d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500'>
                  Save to your saved items
                </span>
              </h4>
            </div>
            <div className='card-body p-0 d-flex mt-2'>
              <i className='feather-lock text-grey-500 me-3 font-lg'></i>
              <h4 className='fw-600 mb-0 text-grey-900 font-xssss mt-0 me-0'>
                Unfollow Group{" "}
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
            <a
              className='fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active'
              href='#navtabs1'
              data-toggle='tab'
            >
              About
            </a>
          </li>
          <li className='list-inline-item me-5'>
            <a
              className='fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block'
              href='#navtabs2'
              data-toggle='tab'
            >
              Membership
            </a>
          </li>
          <li className='list-inline-item me-5'>
            <a
              className='fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block'
              href='#navtabs3'
              data-toggle='tab'
            >
              Discussion
            </a>
          </li>
          <li className='list-inline-item me-5'>
            <a
              className='fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block'
              href='#navtabs4'
              data-toggle='tab'
            >
              Video
            </a>
          </li>
          <li className='list-inline-item me-5'>
            <a
              className='fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block'
              href='#navtabs3'
              data-toggle='tab'
            >
              Group
            </a>
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
              className='fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block'
              href='#navtabs7'
              data-toggle='tab'
            >
              Media
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileBackground;
