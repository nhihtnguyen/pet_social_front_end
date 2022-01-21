import Layout from 'components/Layout';
import PageTitle from '../../../components/pagetitle/PageTitle';
import PetCard from '../../../components/petcard/PetCard';
import axiosClient from 'axiosSetup';
import { host as serverHost } from 'config';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const MyPet = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `/pets?user_id=${id}` : null,
    id ? fetcher : null
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className='row w-100'>
      <div className='col-xl-12 pe-0'>
        <PageTitle title='Family' />
        <div className='row'>
          {data?.map((value, index) => (
            <div className='col-md-6 col-sm-6 pb-3' key={index}>
              <PetCard pet={value} hideButton={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

MyPet.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default MyPet;
