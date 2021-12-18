import Postcard from 'components/postcard/Postcard';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import { FiPlus } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';
import { host as serverHost } from 'config';
import axiosClient from 'axiosSetup';
import useSWR, { SWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useEffect } from 'react';

import Layout from 'components/Layout';
import Head from 'next/head';

const fetcher = async (url) => axiosClient.get(url).then((res) => res.data);

const Content = () => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    return `/posts/explore?page=${pageIndex + 1}`;
  };
  const {
    data: posts,
    size,
    setSize,
    mutate,
    error,
  } = useSWRInfinite(getKey, fetcher);

  return (
    <>
      {!posts && !error ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <ul
          style={{
            columnGap: '0',
            columnWidth: 236,
          }}
        >
          {posts?.map((data) =>
            data?.map((value, index) => (
              <Postcard
                as={'li'}
                key={index}
                index={index}
                value={value}
                href={`post/${value.id}`}
                className={`m-0 mb-3`}
              />
            ))
          )}
        </ul>
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
      <div className='row w-100'>
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
    const response = await axiosClient.get(`${serverHost}/posts/explore`);
    posts = response.data;
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
