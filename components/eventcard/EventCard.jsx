import Link from 'next/link';
import { FiGithub, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import Image from 'next/image';
import styles from './EventCard.module.scss';
import { Card, Row, Col } from 'react-bootstrap';

const EventCard = ({ event }) => {
  return (
    <Card
      className={`shadow-xss p-0 rounded-xxl overflow-hidden border-0 ${styles['event-card']}`}
    >
      <div className={`${styles['front']} card border-0`}>
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
      </div>
      <div className={`${styles['back']} card border-0`}>
        <Card.Body className='d-block pt-4 text-center'>
          <figure className='avatar mt-6 position-relative w100 z-index-1 ms-auto me-auto'>
            <Image
              height={100}
              width={100}
              src='https://picsum.photos/100'
              alt='avatar'
              className='bg-white rounded-xl'
            />
          </figure>
          <h4 className='font-xs ls-1 fw-700 text-grey-900'>
            Award{' '}
            <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
              @id
            </span>
          </h4>
        </Card.Body>
        <Card.Body className='d-flex align-items-center ps-4 pe-4 pt-0'>
          <h4 className='font-xsssss text-center text-grey-500 fw-600 ms-2 me-2'>
            <b className='text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark'>
              456{' '}
            </b>{' '}
            Participants
          </h4>
          <h4 className='font-xsssss text-center text-grey-500 fw-600 ms-2 me-2'>
            <b className='text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark'>
              2.1k{' '}
            </b>{' '}
            Votes
          </h4>
          <h4 className='font-xsssss text-center text-grey-500 fw-600 ms-2 me-2'>
            <b className='text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark'>
              32k{' '}
            </b>{' '}
            Follow
          </h4>
        </Card.Body>
        <Card.Body className='d-flex align-items-center justify-content-center ps-4 pe-4 pt-0'>
          <Link href='/'>
            <a className='bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3'>
              Visit
            </a>
          </Link>
          <Link href='/'>
            <a className='bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700'>
              <i className='font-md'>
                <FiGithub />
              </i>
            </a>
          </Link>
          <Link href='/'>
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
