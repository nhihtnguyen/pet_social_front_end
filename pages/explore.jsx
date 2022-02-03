import Postcard from 'components/postcard/Postcard';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import { FiPlus } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';
import axiosClient from 'axiosSetup';
import { SWRConfig } from 'swr';
import useInfinitePagination from 'hooks/useInfinitePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Masonry } from 'masonic';

import Layout from 'components/Layout';
import Head from 'next/head';
import { useEffect } from 'react';

const MasonryCard = ({ data }) =>
  data?.firstPost ? (
    <div
      className='cursor-pointer rounded-xxl d-flex justify-content-center align-items-center'
      style={{
        minHeight: 200,
        backgroundColor: '#f1f1f1',
        border: '3px dashed grey',
        outline: '10px solid #f1f1f1',
        padding: 10,
        margin: 10,
      }}
    >
      <FiPlus fontSize={32} className='text-current' />
    </div>
  ) : (
    <Postcard value={data} className={`m-0`} />
  );

const Content = () => {
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
    <>
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
        </InfiniteScroll>
      )}
    </>
  );
};

const Explore = ({ fallback }) => {
  return (
    <>
      <Head>
        <title>Explore</title>
        <meta name='description' content="Show a post's list" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='row w-100 m-0'>
        <div className='col-xl-12'>
          <FloatingButton icon={<FiPlus />} href={`/post/create`} />
          <div className='row'>
            <SWRConfig value={{ fallback }}>
              <Content />
            </SWRConfig>
          </div>
        </div>
      </div>
    </>
  );
};
Explore.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = async () => {
  let posts = [];

  try {
    const response = await axiosClient.get(`/posts/explore?limit=10&page=1`);
    if (response.data) {
      posts = response.data;
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      fallback: {
        '/posts': posts,
      },
    },
  };
};

export default Explore;
