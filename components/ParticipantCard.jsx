import Link from 'next/link';
import { FiGithub, FiUser } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import axiosClient from 'axiosSetup';

const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const ParticipantCard = ({ item, mutate }) => {
  const { data: pet, error: loadPet } = useSWR(
    item?.pet_id ? `/pets/${item.pet_id}` : null,
    item?.pet_id ? fetcher : null
  );
  const [toggle, setToggle] = useState(true);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    setVoted(false);
    const getUserVote = async () => {
      try {
        const result = await axiosClient.get(
          `/voting/single?event_id=${item?.event_id}&&participant_id=${item.id}`
        );
        if (result.status === 200) {
          setVoted(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (item) {
      getUserVote();
    }
  }, [item, mutate]);

  const vote = async (event) => {
    event.stopPropagation();
    try {
      setVoted(true);
      const result = await axiosClient.post('/voting/vote', {
        event_id: item?.event_id,
        participant_id: item?.id,
      });
      if (result.status != 200) {
        setVoted(false);
        return;
      }
      // Mutate participants page;
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const unvote = async (event) => {
    event.stopPropagation();

    try {
      setVoted(false);

      const result = await axiosClient.post(`/voting/unvote`, {
        event_id: item?.event_id,
        participant_id: item?.id,
      });
      if (result.status != 200) {
        setVoted(true);
        return;
      }
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className='card shadow-xss p-0 rounded-xxl overflow-hidden border-3'
      style={{ width: 236 }}
      onMouseEnter={() => setToggle(false)}
      onMouseLeave={() => setToggle(true)}
      onClick={() => setToggle(!toggle)}
    >
      <div
        className={`${
          toggle ? 'd-block' : 'd-none'
        } bg-image-cover bg-image-center w-100 h-100 position-absolute bg-white`}
        style={{
          backgroundImage: `url(${
            item?.media_url || 'http://placehold.jp/300x430.png'
          })`,
          zIndex: 11,
        }}
      >
        <h4
          className={`${
            voted ? 'd-block ' : 'd-none '
          }position-absolute z-index-1 w-100 text-center bg-white bg-opacity-50 bg-dark-color`}
        >
          Your vote
        </h4>
      </div>
      <div>
        <div className='card-body d-block pt-4 text-center'>
          <figure className='avatar mt-6 position-relative z-index-1 w100 z-index-1 ms-auto me-auto'>
            <Image
              width={100}
              height={100}
              src={pet?.avatar || 'http://placehold.jp/100x100.png'}
              alt='avatar'
              className='p-1 bg-white rounded-xl w-100'
            />
          </figure>
          <h4 className='font-xs ls-1 fw-700 text-grey-900'>
            {pet?.name || '...'}{' '}
            <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
              @pet
            </span>
          </h4>
        </div>
        <div className='card-body d-flex align-items-center ps-4 pe-4 pt-0'>
          <h2 className='font-xsss text-center text-grey-500 fw-600 m-auto'>
            <b className='font-lg text-grey-900 mb-1 fw-700 d-inline-block ls-3 text-dark'>
              {item?.upvote || 0}{' '}
            </b>{' '}
            <br />
            Votes
          </h2>
        </div>
        <div className='card-body d-flex align-items-center justify-content-center ps-4 pe-4 pt-0'>
          <a
            onClick={voted ? unvote : vote}
            className={`${
              voted ? 'bg-danger ' : 'bg-success '
            }cursor-pointer p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3`}
          >
            {voted ? 'Unvote' : 'Vote'}
          </a>
          <Link href={`/pet/${item?.pet_id}`}>
            <a className='bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700'>
              <i className='font-md'>
                <FiGithub />
              </i>
            </a>
          </Link>
          <Link href={`/user/${item?.user_id}`}>
            <a className='bg-greylight theme-white-bg btn-round-lg ms-2 rounded-3 text-grey-700'>
              <i className='font-md'>
                <FiUser />
              </i>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;
