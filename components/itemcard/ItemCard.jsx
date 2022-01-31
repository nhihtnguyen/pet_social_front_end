import Image from 'next/image';
import { RiCopperCoinLine } from 'react-icons/ri';

const ItemCard = ({ item, onClick, href }) => {
  return (
    <div
      className='card w-100 border-0 rounded-xxl bg-greylight overflow-hidden'
      style={{ maxWidth: 300 }}
    >
      <div className='card-image w-100 p-0 text-center mb-2 '>
        <a href={href || '#'} onClick={onClick}>
          <div className='image-container'>
            <Image
              className='image w-100 mt-0 mb-0'
              src={item.image}
              layout='fill'
              alt={item.name}
            />
          </div>
        </a>
      </div>
      <div className='card-body w-100 p-0 text-center'>
        <h2 className='mt-2 mb-1'>
          <a
            href={href ? href : '#'}
            className='text-dark fw-700 font-xsss lh-26'
          >
            {item.name}
          </a>
        </h2>
        <h6 className='font-xss fw-600 text-current ls-2'>
          <span className='text-success'>
            <RiCopperCoinLine />
          </span>{' '}
          {item.price}
        </h6>
      </div>
    </div>
  );
};

export default ItemCard;
