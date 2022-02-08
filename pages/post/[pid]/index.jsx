import ItemDetail from 'components/itemdetail/PostDetail';
import axiosClient from 'axiosSetup';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';

const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const PostDetail = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { data: post, error } = useSWR(
    pid ? `/posts/${pid}` : null,
    pid ? fetcher : null
  );
  if (error) return <div>failed to load</div>;
  return (
    <div className='row m-0 pe-sm-3 mb-3 justify-content-center w-100'>
      <ItemDetail item={post} pid={pid} loading={!post && !error} />
    </div>
  );
};

PostDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

/*

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

*/

export default PostDetail;
