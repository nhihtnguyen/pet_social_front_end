import Link from 'next/link';
import { FiGithub, FiUser } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './EventCard.module.scss';
import { Card, Row, Col } from 'react-bootstrap';
import axiosClient from 'axiosSetup';
import useSWR from 'swr';
import { calTime } from 'helpers';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const EventCard = ({ event, isClosed, type = undefined, isIncoming }) => {
  const { data: summary, error: error } = useSWR(
    event?.id ? `/events/${event.id}/summary` : null,
    event?.id ? fetcher : null
  );
  const [countdown, setCountdown] = useState('');
  const [internalType, setInternalType] = useState(type);
  useEffect(() => {
    if (typeof type == 'undefined') {
      if (new Date(event.start) - Date.now() > 0) {
        setInternalType('incoming');
      } else if (new Date(event.end) - Date.now() > 0) {
        setInternalType('ongoing');
      } else {
        setInternalType('closed');
      }
    } else {
      setInternalType(type);
    }
    // const a = calTime(new Date(event.end) - Date.now());
    // setCountdown(
    //   a.days +
    //     ' days: ' +
    //     a.hours +
    //     ' hours: ' +
    //     a.minutes +
    //     ' minutes: ' +
    //     a.seconds +
    //     's'
    // );
  }, [event]);
  useEffect(() => {
    if (internalType == 'ongoing') {
      const countdownInterval = setInterval(() => {
        const a = calTime(new Date(event.end) - Date.now());
        setCountdown(a);
      }, 1000);

      return () => {
        if (countdownInterval) {
          clearInterval(countdownInterval);
        }
      };
    }
    if (internalType == 'incoming') {
      const countdownInterval = setInterval(() => {
        const a = calTime(new Date(event.start) - Date.now());
        setCountdown(a);
      }, 1000);

      return () => {
        if (countdownInterval) {
          clearInterval(countdownInterval);
        }
      };
    }
  }, [internalType]);
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
        {internalType == 'closed' && (
          <Card.Body className='d-block pt-4 text-center'>
            <h5 className='fw-500'>{event?.name || 'Name'}</h5>
            <figure className='avatar mt-6 position-relative w100 z-index-1 ms-auto me-auto'>
              <Image
                height={100}
                width={100}
                src={
                  event?.Participants?.at(0)?.media_url ||
                  'https://picsum.photos/100'
                }
                alt='avatar'
                className='bg-white rounded-xl'
              />
            </figure>
            <div className='d-flex align-items-center justify-content-center'>
              <h4 className='font-xss ls-1 fw-700 text-grey-900'>Winner:</h4>
              <Link href={`/user/${event?.Participants?.at(0)?.user_id}`}>
                <a className='bg-greylight theme-white-bg btn-round-md ms-2 text-grey-700'>
                  <i className='font-md'>
                    <FiUser />
                  </i>
                </a>
              </Link>
              <Link href={`/pet/${event?.Participants?.at(0)?.pet_id}`}>
                <a className='bg-greylight theme-white-bg btn-round-md ms-2 text-grey-700'>
                  <i className='font-md'>
                    <FiGithub />
                  </i>
                </a>
              </Link>
            </div>
          </Card.Body>
        )}
        {internalType == 'ongoing' && (
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
            <h4 className='font-xss ls-1 fw-700 text-grey-900'>
              End in: <br />
              <span className='text-success'>
                {countdown?.days +
                  ' days: ' +
                  countdown?.hours +
                  ' hours: ' +
                  countdown?.minutes +
                  ' minutes: ' +
                  countdown?.seconds +
                  's'}
              </span>
            </h4>
          </Card.Body>
        )}
        {internalType == 'incoming' && (
          <Card.Body className='d-block pt-4 text-center'>
            <h5>{event?.name || 'Name'}</h5>
            <figure className='border-3 mt-6 position-relative w100 z-index-1 ms-auto me-auto'>
              <div className='bg-greylight p-3 border-light-md rounded-xxl theme-dark-bg'>
                <h4 className='fw-700 font-lg ls-3 text-grey-900 mb-0'>
                  <span className='ls-3 d-block font-xsss text-grey-500 fw-500 text-uppercase'>
                    {event?.start
                      ? new Date(event?.start).toLocaleString('default', {
                          month: 'short',
                        })
                      : 'Month'}
                  </span>
                  {event?.start ? new Date(event?.start).getDate() : '01'}
                </h4>
              </div>
            </figure>

            <h4 className='font-xss ls-1 fw-700 text-grey-900'>
              Start in: <br />
              <span className='text-info'>
                {countdown?.days +
                  ' days: ' +
                  countdown?.hours +
                  ' hours: ' +
                  countdown?.minutes +
                  ' minutes: ' +
                  countdown?.seconds +
                  's'}
              </span>
            </h4>
          </Card.Body>
        )}
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
