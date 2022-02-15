import Image from 'next/image';
import { Row } from 'react-bootstrap';
import Link from 'next/link';

const NoItem = ({ label, callback }) => {
  return (
    <Row className='justify-content-center align-items-center w-100 position-relative m-0 p-0'>
      <Image
        src='/cat-monogram-dark.svg'
        height={300}
        width={300}
        className='text-dark'
      />
      <span
        style={{ maxWidth: 190, top: 144, color: '#717171' }}
        className='position-absolute cursor-pointer d-lg-block  p-3 z-index-1 rounded-xl text-center font-xsss text-uppercase fw-700 ls-3'
      >
        No item.
        <a className='text-current'>Create now!</a>
      </span>
    </Row>
  );
};

export default NoItem;
