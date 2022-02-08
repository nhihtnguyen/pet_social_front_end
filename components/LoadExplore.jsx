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

const MasonryCard = ({ data }) => <Postcard value={data} className={`m-0`} />;

const LoadExplore = ({ refreshSignal, grid = true }) => {
  const pageSize = Math.floor(
    document?.documentElement?.clientHeight &&
      document?.documentElement?.clientWidth
      ? (document?.documentElement?.clientHeight *
          document?.documentElement?.clientWidth) /
          (200 * 250)
      : 10
  );
  const {
    paginatedData: paginatedPosts,
    size,
    setSize,
    mutate,
    error,
    isReachedEnd,
    loadingMore,
  } = useInfinitePagination(pageSize ? `/posts/explore?` : null, pageSize);

  return (
    <div className='infinite-scroll-parent p-0'>
      {!paginatedPosts && !error ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <InfiniteScroll
          next={() => setSize(size + 1)}
          hasMore={!isReachedEnd}
          loader={<Spinner animation='border' />}
          dataLength={paginatedPosts?.length ?? 0}
          className='w-100 p-0'
          pullToRefresh
        >
          {grid ? (
            <div className='masonic'>
              <Masonry
                // Provides the data for our grid items
                items={paginatedPosts || []}
                // Adds 8px of space between the grid cells
                columnGutter={12}
                // Sets the minimum column width to 172px
                columnWidth={172}
                // Pre-renders 5 windows worth of content
                overscanBy={5}
                // This is the grid item component
                render={MasonryCard}
              />
            </div>
          ) : (
            paginatedPosts.map((post, index) => (
              <PostCardRow post={post} key={index} />
            ))
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default LoadExplore;
