import Header from 'components/header/Header';
import LeftNav from 'components/leftnav/LeftNav';
import Postcard from 'components/postcard/Postcard';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import { FiPlus } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';
import { host as serverHost } from 'config';
import axiosClient from 'axiosSetup';
import useSWR, { SWRConfig } from 'swr';

const fetcher = async (url) => axiosClient.get(url).then((res) => res.data);

const Content = () => {
  const { data: posts, error } = useSWR(`${serverHost}/posts`, fetcher);

  return (
    <>
      {!posts && !error ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <section
          style={{
            columnWidth: 236,
            columnGap: 5,
            padding: 5,
          }}
        >
          {posts?.map((value, index) => (
            <Postcard
              key={index}
              index={index}
              value={value}
              href={`post/${value.id}`}
            />
          ))}
        </section>
      )}
    </>
  );
};

const Explore = ({ fallback }) => {
  return (
    <div>
      <Header />
      <LeftNav />
      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left pe-0'>
            <div className='row w-100'>
              <div className='col-xl-12'>
                <FloatingButton icon={<FiPlus />} href={`/create`} />

                <div className='row ps-2 pe-1 justify-content-center'>
                  <SWRConfig value={{ fallback }}>
                    <Content />
                  </SWRConfig>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  let posts = [];

  try {
    const response = await axiosClient.get(`${serverHost}/posts`);
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
/*
//Static generate
export const getStaticProps = async () => {
  let posts = [];

  try {
    const response = await axiosClient.get(`${serverHost}/posts`);
    posts = response.data;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      posts,
    },
  };
};
*/

export default Explore;
