import Postcard from 'components/postcard/Postcard';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import { FiPlus } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';
import { host as serverHost } from 'config';
import axiosClient from 'axiosSetup';
import useSWR, { SWRConfig } from 'swr';
import Masonry from 'react-masonry-component';
import styles from 'styles/Explore.module.scss';
import Layout from 'components/Layout';

const fetcher = async (url) => axiosClient.get(url).then((res) => res.data);

const Content = () => {
  const { data: posts, error } = useSWR(`${serverHost}/posts`, fetcher);
  const masonryOptions = {
    transitionDuration: 0,
    fitWidth: true,
  };
  return (
    <>
      {!posts && !error ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <Masonry
          className={`${styles.masonry}`}
          elementType={'ul'}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {posts?.map((value, index) => (
            <Postcard
              as={'li'}
              key={index}
              index={index}
              value={value}
              href={`post/${value.id}`}
              className={`mb-3 me-3 `}
            />
          ))}
        </Masonry>
      )}
    </>
  );
};

const Explore = ({ fallback }) => {
  return (
    <Layout>
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
    </Layout>
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

export default Explore;
