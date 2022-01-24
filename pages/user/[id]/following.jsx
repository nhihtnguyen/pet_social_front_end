import PostUser from 'components/postuser/PostUser';
import Layout from 'components/Layout';
import PageTitle from 'components/pagetitle/PageTitle';
import PetCard from '../../../components/petcard/PetCard';
import axiosClient from 'axiosSetup';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);
import Link from 'next/link';

const Following = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate } = useSWR(
    id ? `/following/following` : null,
    id ? fetcher : null
  );
  if (error) return <div>failed to load</div>;
  if (!data || !id) return <div>loading...</div>;

  const handleClick = (id) => () => {
    router.push('/pet/' + id);
  };
  return (
    <div className='row w-100'>
      <div className='col-xl-12 pe-0'>
        <PageTitle title='Following' />
        <div className='row'>
          {data.map((value) => {
            return (
              <div key={value} className='col-md-6 col-sm-6 pe-2'>
                <PetCard
                  pet={value}
                  followed={true}
                  mutate={mutate}
                  onClick={handleClick(value.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Following.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Following;
