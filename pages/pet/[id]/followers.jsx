import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import UserCard from '../../../components/UserCard';
import axiosClient from 'axiosSetup';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);
import Link from 'next/link';

const Follower = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `/following/followers/${id}` : null,
    id ? fetcher : null
  );
  if (error) return <div>failed to load</div>;
  if (!data || !id) return <div>loading...</div>;
  return (
    <div className='row w-100'>
      <div className='col-xl-12 pe-0'>
        <PageTitle title='Follower' />
        <div className='row'>
          {data.map((value) => {
            return (
              <div key={value} className='col-md-3 col-sm-4 pe-2'>
                <UserCard profile={value} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Follower.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Follower;
