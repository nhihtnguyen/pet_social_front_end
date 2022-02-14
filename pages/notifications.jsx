import NotificationBanner from 'components/NotificationBanner';
import Layout from 'components/Layout';
import { useNotification } from 'app/notificationContext';
import { FiTrash } from 'react-icons/fi';
import { useState } from 'react';

const Notification = () => {
  const { history, clearAll } = useNotification();
  const pageLimit = 6;
  const [page, setPage] = useState(0);

  return (
    <div className='row p-0 m-0 pe-sm-3 mb-3'>
      <div className='card rounded-xxl shadow-xss p-3 w-100 position-relative scroll-bar bg-white'>
        <h2 className='fw-700 mb-4 mt-2 font-md text-grey-900 d-flex align-items-center'>
          Notification
          <span className='circle-count bg-warning text-white font-xsssss rounded-3 ms-2 ls-3 fw-600 p-2  mt-0'>
            {history?.length || 0}
          </span>
          <a
            onClick={clearAll}
            className='cursor-pointer ms-auto btn-round-sm bg-greylight rounded-3'
          >
            <span className='font-xs text-grey-700'>
              <FiTrash />
            </span>
          </a>
        </h2>

        <ul className='notification-box'>
          {history?.length == 0 && 'No item'}
          {history
            ?.reverse()
            ?.slice(page * pageLimit, page * pageLimit + pageLimit)
            ?.map((value, index) => (
              <NotificationBanner
                content={value?.incomingMessage}
                variant={value?.variant}
                time={value?.time}
                key={index}
                className='mb-1'
              />
            ))}
        </ul>
        <div className='d-flex position-relative'>
          {page > 0 && (
            <a
              onClick={() => setPage(page - 1)}
              className='cursor-pointer me-auto text-dark'
            >
              {'<Newer'}
            </a>
          )}
          {page * pageLimit < history.length && (
            <a
              onClick={() => setPage(page + 1)}
              className='cursor-pointer ms-auto text-dark'
            >
              {'Older>'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

Notification.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Notification;
