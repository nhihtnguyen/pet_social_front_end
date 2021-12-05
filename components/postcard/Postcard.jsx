import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

const Postcard = ({ value, index }) => {
  return (
    <Card
      className='d-block border-0 shadow-xss rounded-3 bg-gradient-bottom mb-3 '
      style={{
        width: '236px',
      }}
    >
      <Link href={`/post/${value.id}`}>
        <a>
          <div className={`image-container rounded-3`} style={{ width: 236 }}>
            <Image
              src={value.media_URL ? value.media_URL : '/'}
              layout='fill'
              alt={value.caption}
              className='image rounded-3'
            />
          </div>
        </a>
      </Link>

      <Card.Body className='d-block w-100 position-absolute bottom-0 text-center'>
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
          {value.name}
        </h4>
      </Card.Body>
    </Card>
  );
};

export default Postcard;
