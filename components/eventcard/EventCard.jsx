import Link from 'next/link';
import { FiGithub, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import Image from 'next/image';
import styles from './EventCard.module.scss';
import { Card, Row, Col } from 'react-bootstrap';
import axiosClient from 'axiosSetup';
import useSWR from 'swr';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const EventCard = ({ event }) => {
  const { data: summary, error: error } = useSWR(
    event?.id ? `/events/${event.id}/summary` : null,
    event?.id ? fetcher : null
  );
  return (
    <Card
      className={`shadow-xss p-0 rounded-xxl overflow-hidden border-0 ${styles['event-card']}`}
    >
      {/* <div className={`${styles['front']} card border-0`}>
        <Card.Img
          className={`${styles['front']} bg-image-cover bg-image-center bg-white`}
          style={{
            paddingTop: '90%',
            backgroundImage: `url(${
              event?.thumbnail || 'https://picsum.photos/300/430'
            })`,
          }}
        />
        <Card.Body>
          <h5>{event?.name || 'Name'}</h5>
        </Card.Body>
      </div> */}
      <div className={`${styles['back']} card border-0`}>
        <Card.Body className='d-block pt-4 text-center'>
          <h5>{event?.name || 'Name'}</h5>
          <figure className='avatar mt-6 position-relative w100 z-index-1 ms-auto me-auto'>
            <Image
              height={100}
              width={100}
              src='https://picsum.photos/100'
              alt='avatar'
              className='bg-white rounded-xl'
            />
          </figure>
          <h4 className='font-xss ls-1 fw-700 text-grey-900'>Award </h4>
        </Card.Body>
        <Card.Body className='d-flex align-items-center ps-5 pe-5 pt-0'>
          <h4 className='font-xsssss text-center text-grey-500 fw-600 ms-2 me-2'>
            <b className='text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark'>
              {summary?.total_participants || '0'}{' '}
            </b>{' '}
            Participants
          </h4>
          <h4 className='font-xsssss text-center text-grey-500 fw-600 me-2 ms-auto'>
            <b className='text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark'>
              {summary?.total_votes || '0'}{' '}
            </b>{' '}
            Votes
          </h4>
        </Card.Body>
        <Card.Body className='d-flex align-items-center justify-content-center ps-4 pe-4 pt-0'>
          <Link href={`/event/${event?.id}`}>
            <a className='bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3'>
              Visit
            </a>
          </Link>

          <Link href={`/user/${event?.creator}`}>
            <a className='bg-greylight theme-white-bg btn-round-lg ms-2 rounded-3 text-grey-700'>
              <i className='font-md'>
                <FiUser />
              </i>
            </a>
          </Link>
        </Card.Body>
      </div>
    </Card>
  );
};

export default EventCard;
