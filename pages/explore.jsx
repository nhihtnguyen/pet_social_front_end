import Postcard from 'components/postcard/Postcard';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import { FiPlus, FiGrid, FiList } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';
import axiosClient from 'axiosSetup';
import { SWRConfig } from 'swr';
import useInfinitePagination from 'hooks/useInfinitePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Masonry } from 'masonic';

import Layout from 'components/Layout';
import Head from 'next/head';
import { useState } from 'react';
import LoadExplore from 'components/LoadExplore';

const Explore = ({ fallback }) => {
  const [grid, setGrid] = useState(true);
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
          <FloatingButton
            icon={grid ? <FiGrid /> : <FiList />}
            index={1}
            onClick={() => setGrid(!grid)}
          />

          <div className='row'>
            <SWRConfig value={{ fallback }}>
              <LoadExplore grid={grid} />
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
