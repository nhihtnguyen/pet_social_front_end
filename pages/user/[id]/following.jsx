import Layout from 'components/Layout';
import PageTitle from 'components/pagetitle/PageTitle';
import PetCard from '../../../components/petcard/PetCard';
import axiosClient from 'axiosSetup';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useAuth } from 'app/authContext';

const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const Following = () => {
  const { user } = useAuth();

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
  const isOwner = user?.id === id;

  return (
    <div className='row w-100'>
      <div className='col-xl-12 pe-0'>
        <PageTitle title='Following' />
        <div className='row'>
          {data.map((value, index) => {
            return (
              <div key={index} className='col-md-6 col-sm-6 pb-3'>
                <PetCard
                  pet={value}
                  followed={true}
                  mutate={mutate}
                  hideButton={!isOwner}
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
