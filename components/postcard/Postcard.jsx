import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import styles from './Postcard.module.scss';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

const Postcard = ({ value, className, ...props }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [width, setWidth] = useState(236);

  const ratio = value?.size?.split('x')[0] / value?.size?.split('x')[1];
  const height = width / ratio;
  const linkToDetail = () => {
    router.push(`/post/${value.id}`);
  };
  const linkToAuthor = (event) => {
    event.stopPropagation();
    router.push(`/user/${value?.User?.id || value?.user_id}`);
  };

  return (
    <Card
      className={`${
        className || ''
      } d-block cursor-pointer border-0 shadow-xss rounded-xxl`}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      onClick={linkToDetail}
      {...props}
    >
      <Image
        className='rounded-xxl'
        width={width}
        height={height}
        layout='responsive'
        src={value.media_url || `https://via.placeholder.com/400`}
        alt={value.media_url || 'image'}
      />

      {hover && (
        <div
          className={`${styles['post-card-hover']} d-flex position-absolute rounded-xxl top-0 w-100 h-100`}
        >
          <div
            className={`d-flex flex-column w-100 mb-2 text-center justify-content-end`}
          >
            <figure className='avatar cursor-pointer ms-auto me-auto mb-0 position-relative '>
              <Image
                onClick={linkToAuthor}
                width={40}
                height={40}
                src={value?.User?.avatar || 'https://via.placeholder.com/40'}
                alt='avatar'
                className='rounded-circle shadow-xss'
              />
            </figure>

            <div className='clearfix'></div>
            <h4 className='fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-0 mb-1'>
              {value?.User?.first_name && value?.User?.last_name
                ? `${value.User.first_name} ${value.User.last_name}`
                : value?.user_name || 'Full Name'}
            </h4>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Postcard;
