import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const ActionHeader = ({ link, title, ...props }) => {
  const router = useRouter();

  return (
    <div {...props}>
      <h2
        className='fw-600 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center'
        style={{ lineHeight: '22px' }}
      >
        <Link href={link}>
          <a className='me-2 cursor-pointer'>
            <FiArrowLeft />
          </a>
        </Link>

        {title}
      </h2>
    </div>
  );
};

export default ActionHeader;
