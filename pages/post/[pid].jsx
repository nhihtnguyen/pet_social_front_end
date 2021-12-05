import Header from 'components/header/Header';
import LeftNav from 'components/leftnav/LeftNav';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ItemDetail from 'components/itemdetail/PostDetail';
import axiosClient from 'axiosSetup';

const PostDetail = ({ post, pid }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Header />
      <LeftNav />
      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left pe-0'>
            <div className='row w-100'>
              <div className='col-xl-12'>
                <div className='justify-content-center'>
                  <ItemDetail item={post} pid={pid} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  let post = {};
  const { pid } = params;

  try {
    const response = await axiosClient.get(`${serverHost}/posts/${pid}`);
    post = response.data;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      post,
      pid,
    },
  };
};

export async function getStaticPaths() {
  let posts = [];
  try {
    const response = await axiosClient.get(`${serverHost}/posts`);
    posts = response.data;
  } catch (error) {
    console.error(error);
  }

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { pid: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export default PostDetail;
