import Link from 'next/link';
import Image from 'next/image';
import axiosClient from 'axiosSetup';

const PetCard = ({
  pet,
  as,
  hideButton,
  className,
  followed,
  mutate,
  onClick,
}) => {
  const follow = async () => {
    try {
      await axiosClient.post(`/following/follow`, { pet_id: pet.id });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };
  const unfollow = async () => {
    try {
      await axiosClient.post(`/following/unfollow`, { pet_id: pet.id });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${
        className || ''
      } card d-block border-0 shadow-xss rounded-3 overflow-hidden rounded-xxl`}
      as={as || 'div'}
    >
      <div
        className='card-body position-relative h100 bg-image-cover bg-image-center'
        style={{
          backgroundImage:
            pet?.background || `url("https://via.placeholder.com/427x100")`,
        }}
      ></div>
      <div className='card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative'>
        <figure
          className='avatar position-absolute w75 z-index-1 left-15 cursor-pointer'
          style={{ marginTop: `-40px` }}
          onClick={onClick}
        >
          <div className={`image-container`}>
            <Image
              layout='fill'
              src={'https://via.placeholder.com/100'}
              alt='avatar'
              className='image float-right p-1 bg-white rounded-circle w-100 '
            />
          </div>
        </figure>
        <div className='clearfix'></div>
        <h4 className='fw-700 font-xsss mt-3 mb-1'>{pet?.name || 'Name'}</h4>
        <p className='fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-3'>
          @mickey
        </p>
        {!hideButton && (
          <span className='position-absolute right-15 top-0 d-flex align-items-center'>
            <a
              onClick={followed ? unfollow : follow}
              className='cursor-pointer text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white'
            >
              {followed ? 'Un-follow' : 'Follow'}
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default PetCard;
