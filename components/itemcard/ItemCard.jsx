import Image from 'next/image';

const ItemCard = ({ item, onClick, href }) => {
  return (
    <div className='card w-100 border-0 rounded-xxl' style={{ maxWidth: 300 }}>
      <div className='card-image w-100 p-0 text-center bg-greylight rounded-xxl mb-2'>
        <a href={href ? href : '#'} onClick={onClick}>
          <div className='image-container'>
            <Image
              className='image w-100 mt-0 mb-0 rounded-xxl'
              src={item.image}
              layout='fill'
              style={{
                borderBottomLeftRadius: '0 !important',
                borderBottomRightRadius: '0 !important',
              }}
              alt={item.name}
            />
          </div>
        </a>
      </div>
      <div className='card-body w-100 p-0 text-center'>
        <h2 className='mt-2 mb-1'>
          <a
            href={href ? href : '#'}
            className='text-black fw-700 font-xsss lh-26'
          >
            {item.name}
          </a>
        </h2>
        <h6 className='font-xss fw-600 text-current ls-2'>Œ{item.price}</h6>
      </div>
    </div>
  );
};

export default ItemCard;
