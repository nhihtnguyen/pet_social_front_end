import Image from 'next/image';
import { Card, Figure } from 'react-bootstrap';
import Link from 'next/link';

const UserCard = ({ profile, as }) => {
  return (
    <Card
      className='d-block border-0 shadow-xss overflow-hidden mb-3 rounded-xxl'
      as={as}
    >
      <Card.Body className='d-block w-100 ps-3 pe-3 pb-4 text-center'>
        <Link href={profile ? `/user/${profile.id}` : '/user'}>
          <a>
            <Figure className='overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1'>
              <div className='image-container'>
                <Image
                  layout='fill'
                  src={'https://picsum.photos/200'}
                  alt='avatar'
                  className='image float-right p-0 bg-white rounded-circle w-100 h-90 shadow-xss'
                />
              </div>
            </Figure>
          </a>
        </Link>

        <div className='clearfix w-100'></div>
        <h4 className='fw-700 font-xsss mt-3 mb-0'>
          {profile ? profile.first_name + ' ' + profile.last_name : 'Full Name'}
        </h4>
        <p className='fw-500 font-xssss text-grey-500 mt-0 mb-3'>
          @{profile?.username || 'username'}
        </p>

        {false && (
          <a
            href='#'
            className='mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white'
          >
            FOLLOW
          </a>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserCard;
