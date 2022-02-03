import Image from 'next/image';
import { RiCopperCoinLine } from 'react-icons/ri';
import { Placeholder } from 'react-bootstrap';

const ItemCard = ({ item, onClick, href, loading }) => {
  return (
    <div className='card w-100 border-0 rounded-xxl bg-greylight overflow-hidden'>
      <div className='card-image w-100 p-0 text-center mb-2 '>
        <a href={href || '#'} onClick={onClick}>
          <div className='image-container'>
            <Image
              className='image w-100 mt-0 mb-0'
              src={item?.image || 'https://via.placeholder.com/300'}
              layout='fill'
              alt={item?.name || 'bg'}
            />
          </div>
        </a>
      </div>
      <div className='card-body w-100 p-0 text-center'>
        {loading ? (
          <Placeholder as='h6' animation='glow'>
            <Placeholder xs={7} /> <Placeholder xs={5} />{' '}
          </Placeholder>
        ) : (
          <>
            <h6 className='mb-1'>
              <a
                href={href ? href : '#'}
                className='text-dark fw-700 font-xsss lh-26'
              >
                {item?.name || '...'}
              </a>
            </h6>
            <h6 className='font-xss fw-600 text-current ls-2'>
              <span className='text-success'>
                <RiCopperCoinLine />
              </span>{' '}
              {item?.price && typeof item?.price != 'object'
                ? item.price
                : '...'}
            </h6>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
