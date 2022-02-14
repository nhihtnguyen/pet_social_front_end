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

export default PostDetail;
