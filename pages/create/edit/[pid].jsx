import CreatePost from 'components/createpost/CreatePost';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import axiosClient from 'axiosSetup';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const Edit = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { data: post, error } = useSWR(
    pid ? `/posts/${pid}` : null,
    pid ? fetcher : null
  );
  if (error) return <div>failed to load</div>;

  return (
    <div className='row ms-0 pe-2 mb-3 justify-content-center w-100'>
      <CreatePost isEdit={true} content={post} />
    </div>
  );
};

Edit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Edit;
