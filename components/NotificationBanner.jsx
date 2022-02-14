import Link from 'next/link';
import Image from 'next/image';
import { FiMoreVertical } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { calTime } from 'helpers';

const NotificationBanner = ({
  content,
  variant,
  time,
  className,
  ...props
}) => {
  const [messageTime, setMessageTime] = useState('...');
  useEffect(() => {
    try {
      if (time) {
        const temp = calTime(Date.now() - new Date(time).getTime());
        if (temp.days > 7) {
          setMessageTime(new Date(time));
        } else if (temp.days > 0) {
          setMessageTime(temp.days + ' days ago');
        } else if (temp.hours > 0) {
          setMessageTime(temp.hours + ' hours ago');
        } else if (temp.minutes > 0) {
          setMessageTime(temp.minutes + ' minutes ago');
        } else if (temp.seconds > 0) {
          setMessageTime(temp.seconds + ' seconds ago');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [time]);
  return (
    <div
      className={`d-flex align-items-center p-3 rounded-3 ${className} ${
        variant ? `bg-${variant} bg-opacity-50` : ''
      }`}
      {...props}
    >
      <Image
        src={'https://via.placeholder.com/45'}
        alt='user'
        width='45px'
        height='45px'
        className='rounded-circle'
      />
      <i
        className={`text-white me-2 font-xssss notification-react ${content?.status}`}
      ></i>
      <h6 className='font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-500 lh-20'>
        <strong>{content?.title}</strong> : {content?.content}
        <span className='d-block text-grey-700 font-xssss fw-600 mb-0 mt-0 0l-auto'>
          {' '}
          {messageTime}
        </span>{' '}
      </h6>
      <i className='text-grey-500 font-xs ms-auto'>
        <FiMoreVertical />
      </i>
    </div>
  );
};

export default NotificationBanner;
