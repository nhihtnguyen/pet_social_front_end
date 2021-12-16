import ItemDetail from 'components/itemdetail/PostDetail';
import axiosClient from 'axiosSetup';
import { host as serverHost } from 'config';
import Layout from 'components/Layout';

const PostDetail = ({ post, pid }) => {
  return (
    <div className='row ms-0 me-1 mb-3 justify-content-center w-100'>
      <ItemDetail item={post} pid={pid} />
    </div>
  );
};

PostDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
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
    params: { pid: `${post.id}` },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export default PostDetail;
