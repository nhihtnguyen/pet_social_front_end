import CreatePost from 'components/CreatePost';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import axiosClient from 'axiosSetup';
import { useAuth } from 'app/authContext';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const Edit = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { pid } = router.query;
  const { data: post, error } = useSWR(
    pid ? `/posts/${pid}` : null,
    pid ? fetcher : null
  );
  if (error) return <div>failed to load</div>;
  if (user && post?.User && user?.id !== post?.User?.id) {
    router.replace(`/post/${pid}`);
  }

  return (
    <div className='row ms-0 ps-sm-3 mb-3 justify-content-center w-100'>
      <CreatePost isEdit={true} content={post} />
    </div>
  );
};

Edit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Edit;
