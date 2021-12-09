import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import styles from './Postcard.module.scss';
import { useState } from 'react';

const Postcard = ({ value, index, as }) => {
  const [hover, setHover] = useState(false);
  return (
    <Card
      as={as}
      className={`d-block border-0 shadow-xss rounded-xxl bg-gradient-bottom mb-3`}
      style={{
        width: '236px',
        margin: 'auto',
      }}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      <Link href={`/post/${value.id}`}>
        <a>
          <Card.Img
            className={`image-container rounded-xxl`}
            style={{ width: 236 }}
            src={value.media_URL || '/'}
            alt={value.media_URL}
          />
          {hover && (
            <div
              className={`d-flex flex-column w-100 position-absolute bottom-0 text-center`}
            >
              <figure className='avatar ms-auto me-auto mb-0 position-relative w50 z-index-1'>
                <Link href={`/user/`}>
                  <a>
                    <div
                      className={`image-container float-right p-0 bg-white rounded-circle shadow-xss`}
                    >
                      <Image
                        layout='fill'
                        src={
                          value?.user_avatar
                            ? value.user_avatar
                            : `/assets/images/${'user.png'}`
                        }
                        alt='avatar'
                        className='image rounded-circle w-100 shadow-xss'
                      />
                    </div>
                  </a>
                </Link>
              </figure>

              <div className='clearfix'></div>
              <h4 className='fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1'>
                {value.name || 'name'}
              </h4>
            </div>
          )}
        </a>
      </Link>
    </Card>
  );
};

export default Postcard;
