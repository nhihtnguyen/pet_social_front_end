import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import styles from './Postcard.module.scss';
import { useState } from 'react';

const Postcard = ({ value, index, as, className }) => {
  const [hover, setHover] = useState(false);
  const width = 254;
  const height =
    (Number(value?.size?.split('x')[1]) * width) /
      Number(value?.size?.split('x')[0]) || 300;
  return (
    <Card
      as={as}
      className={`${className} d-block border-0 shadow-xss rounded-xxl bg-gradient-bottom`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      <Link href={`/post/${value.id}`}>
        <a>
          <Image
            className='rounded-xxl border-0'
            width={width}
            height={height}
            src={value.media_url || '/'}
            alt={value.media_url || '/'}
          />
          {hover && (
            <div
              className={`position-absolute rounded-xxl top-0 w-100 h-100`}
              style={{
                background:
                  'radial-gradient(circle, rgba(244,238,241,0) 0%, rgba(71,71,71,0.8) 85%)',
              }}
            >
              <div
                className={`d-flex flex-column w-100 position-absolute bottom-0 mb-2 text-center`}
              >
                <Link href={`/user/${value.User.id}` || `/user`}>
                  <a className='avatar ms-auto me-auto mb-0 position-relative w50'>
                    <Image
                      width={50}
                      height={50}
                      src={value?.User.avatar || `/assets/images/${'user.png'}`}
                      alt='avatar'
                      className='float-right p-0 bg-white rounded-circle shadow-xss w-100 h-100'
                    />
                  </a>
                </Link>

                <div className='clearfix'></div>
                <h4 className='fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-0 mb-1'>
                  {value?.User.first_name && value?.User.last_name
                    ? `${value.User.first_name} ${value.User.last_name}`
                    : 'Full Name'}
                </h4>
              </div>
            </div>
          )}
        </a>
      </Link>
    </Card>
  );
};

export default Postcard;
