import Postcard from 'components/postcard/Postcard';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import { FiPlus } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';
import { host as serverHost } from 'config';
import axiosClient from 'axiosSetup';
import { SWRConfig } from 'swr';
import useInfinitePagination from 'hooks/useInfinitePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Masonry } from 'masonic';

import Layout from 'components/Layout';
import Head from 'next/head';

const MasonryCard = ({ data }) => <Postcard value={data} className={`m-0`} />;

const Content = () => {
  const {
    paginatedData: paginatedPosts,
    size,
    setSize,
    mutate,
    error,
    isReachedEnd,
    loadingMore,
  } = useInfinitePagination(`/posts/explore?`, 10);

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
        >
          <div className='masonic me-auto ms-auto'>
            <Masonry
              // Provides the data for our grid items
              items={paginatedPosts}
              // Adds 8px of space between the grid cells
              columnGutter={8}
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
          <FloatingButton icon={<FiPlus />} href={`/create`} />
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
