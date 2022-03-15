import useSWR from 'swr';
import axiosClient from 'axiosSetup';
import Image from 'next/image';
import { Placeholder } from 'react-bootstrap';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const PetItem = ({ petId, ...props }) => {
  const { data: pet, error } = useSWR(
    petId ? `/pets/${petId}` : null,
    petId ? fetcher : null
  );
  const loading = !pet && !error;
  const router = useRouter();
  const linkToPet = () => {
    router.push(`/pet/${petId}`);
  };

  return (
    <div
      className='w60'
      style={{
        scrollSnapAlign: 'start',
      }}
      onClick={linkToPet}
      {...props}
    >
      <Image
        src={pet?.avatar || 'http://placehold.jp/60x60.png'}
        width={60}
        height={60}
        layout='fixed'
        alt='avt'
        className='rounded-circle w60 bg-white bg-opacity-75 p-1 cursor-pointer'
      />
      <h6 className='fw-500 font-xssss text-center m-0 p-0 mb-1 lh-1'>
        {pet?.name || 'name'}
      </h6>
    </div>
  );
};

const LoadRisingPets = () => {
  const { data: pets, error } = useSWR('/pets/popular-pet', fetcher);
  const loading = !pets && !error;

  const containerRef = useRef(null);
  const [status, setStatus] = useState({
    scroller: null,
    itemWidth: 0,
    isPrevHidden: true,
    isNextHidden: false,
  });

  const handleNext = () => {
    status.scroller.scrollBy({
      left: 60,
      top: 0,
      behavior: 'smooth',
    });

    // Hide if is the last item
    setStatus({ ...status, isNextHidden: true, isPrevHidden: false });
  };

  const handlePrev = () => {
    status.scroller.scrollBy({
      left: -60,
      top: 0,
      behavior: 'smooth',
    });
    setStatus({ ...status, isNextHidden: false, isPrevHidden: true });
    // Hide if is the last item
    // Show remaining
  };

  useEffect(() => {
    const scroller = containerRef.current;
    const itemWidth = containerRef.current.clientWidth;
    setStatus({ ...status, scroller, itemWidth });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return (
    <div className='bg-white rounded-xxl p-1 ps-3 pe-3 mb-3 theme-dark-bg bg-opacity-75 shadow-lg position-relative'>
      <h6 className='border-bottom lh-26 fw-500'>Pets to follow</h6>

      <span
        onClick={handlePrev}
        className='position-absolute ms-auto z-index-1 bg-transparent rounded-3 text-grey-500 text-dark'
        style={{ height: 60, lineHeight: '60px', left: 2 }}
      >
        <FiChevronLeft size={30} />
      </span>
      <span
        onClick={handleNext}
        className='position-absolute ms-auto z-index-1 bg-transparent rounded-3 text-grey-500 text-dark'
        style={{ height: 60, lineHeight: '60px', right: 2 }}
      >
        <FiChevronRight size={30} />
      </span>

      <div
        className='overflow-scroll hide-scrollbar d-flex position-relative ms-3 me-3'
        style={{
          scrollSnapType: 'x mandatory',
        }}
        ref={containerRef}
      >
        {!loading &&
          pets?.map((value, index) => (
            <PetItem key={index} petId={value?.pet_id} className='me-1' />
          ))}

        {loading && (
          <span className='w60 rounded-circle overflow-hidden'>
            <Placeholder width={60} height={60} animation='glow' />
          </span>
        )}
      </div>
    </div>
  );
};

export default LoadRisingPets;
