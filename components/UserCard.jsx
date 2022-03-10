import Image from 'next/image';
import { Card, Figure } from 'react-bootstrap';
import Link from 'next/link';

const UserCard = ({ profile, as }) => {
  return (
    <Card
      className='d-block border-0 shadow-xss overflow-hidden mb-3 rounded-xxl'
      as={as || 'div'}
    >
      <Card.Body className='d-block w-100 ps-3 pe-3 pb-4 text-center'>
        <Link href={profile ? `/user/${profile.id}` : '/user'}>
          <a>
            <Figure className='avatar w65 z-index-1'>
              <Image
                width={65}
                height={65}
                src={profile?.avatar || 'http://placehold.jp/65x65.png'}
                alt='avatar'
                className='rounded-circle'
              />
            </Figure>
          </a>
        </Link>
        <h4 className='fw-700 font-xsss mt-1 mb-0'>
          {profile ? profile.first_name + ' ' + profile.last_name : 'Full Name'}
        </h4>
        <p className='fw-500 font-xssss text-grey-500 mt-0 mb-0'>
          @{profile?.username || 'username'}
        </p>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
