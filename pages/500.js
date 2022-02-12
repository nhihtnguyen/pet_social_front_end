import Image from 'next/image';
import { Row } from 'react-bootstrap';
import Link from 'next/link';

export default function Page404() {
  return (
    <Row className='justify-content-center align-items-center w-100'>
      <Image src='/500.svg' height={500} width={500} />;
      <Link href='/'>
        <a
          className='cursor-pointer d-lg-block bg-current p-3 z-index-1 rounded-xl text-center text-white font-xsssss text-uppercase fw-700 ls-3'
          style={{ maxWidth: 200 }}
        >
          Try again
        </a>
      </Link>
    </Row>
  );
}
