import Postcard from 'components/postcard/Postcard';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import { FiPlus } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';
import axiosClient from 'axiosSetup';
import { SWRConfig } from 'swr';
import useInfinitePagination from 'hooks/useInfinitePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Masonry } from 'masonic';
import PostCardRow from 'components/PostCardRow';

import Layout from 'components/Layout';
import Head from 'next/head';
import { useEffect } from 'react';
import NoItem from 'components/NoItem';

import EventCard from 'components/eventcard/EventCard';

const LoadEvents = ({ refreshSignal }) => {
  const {
    paginatedData: paginatedEvents,
    size,
    setSize,
    mutate,
    error,
    isReachedEnd,
    loadingMore,
  } = useInfinitePagination(`/events?`);

  return (
    <div className='infinite-scroll-parent p-0'>
      {!paginatedEvents && !error ? (
        <Spinner animation='border' role='status' />
      ) : (
        <InfiniteScroll
          next={() => setSize(size + 1)}
          hasMore={!isReachedEnd}
          loader={<Spinner animation='border' />}
          dataLength={paginatedEvents?.length ?? 0}
          className='w-100 p-0'
          pullToRefresh
        >
          <div className='row middle-wrap'>
            {paginatedEvents.map((event, index) => (
              <div
                key={index}
                className='col-sm-4 col-xs-12 p-0 pe-3 m-0 mb-3 '
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
      {paginatedEvents?.length == 0 && <NoItem />}
    </div>
  );
};

export default LoadEvents;
