import { useNotification } from 'app/notificationContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toast, Modal, ToastContainer, ProgressBar } from 'react-bootstrap';
import Image from 'next/image';

const CentralNotification = ({ children }) => {
  const { message, show, setShow, delay, position, variant, loading } =
    useNotification();
  return (
    <>
      <ToastContainer
        position='top-end'
        className='z-index-1 p-top-nav mt-3 me-2'
      >
        <Toast
          show={show}
          onClose={() => setShow(false)}
          delay={delay}
          autohide={!!delay}
          bg={variant?.toLowerCase()}
          className={`card border-0 rounded-xxl overflow-hidden text-dark ${
            variant?.toLowerCase() != '' && variant?.toLowerCase() != 'light'
              ? 'text-white'
              : ''
          }`}
        >
          {/* <Toast.Header className='bg-dark-color'>
            <img src={message.image} className='rounded me-2' alt='' />
            <strong className='me-auto'>{message.title}</strong>
            <small>{message.time}</small>
          </Toast.Header> */}
          <Toast.Header>
            <strong className='font-xsss mt-0 fw-700 d-block me-auto'>
              {message.title}
            </strong>
            <span className='font-xsssss fw-600 float-right'>
              {message.time}
            </span>
          </Toast.Header>
          <Toast.Body className='d-flex align-items-center'>
            <div className='left-0'>
              <Image
                src={
                  message.image ||
                  `https://ui-avatars.com/api/name=${message.title}&background=random`
                }
                width={40}
                height={40}
                layout='fixed'
                alt='user'
                className='rounded-circle'
              />
            </div>
            <h6 className='fw-500 font-xsss lh-4 ps-2'>{message.content}</h6>
          </Toast.Body>
          {loading && <ProgressBar animated now={100} />}
        </Toast>
      </ToastContainer>

      {children}
    </>
  );
};

export default CentralNotification;
