import Layout from 'components/Layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import CreatePet from 'components/CreatePet';
import { useAuth } from 'app/authContext';
import axiosClient from 'axiosSetup';

const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const AddPet = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { id } = router.query;
  const { data: pet, error } = useSWR(
    id ? `/pets/${id}` : null,
    id ? fetcher : null
  );
  if (error) return <div>failed to load</div>;
  if (user && pet?.User && user?.id !== pet?.User?.id) {
    router.replace(`/pet/${id}`);
  }
  return (
    <div className='middle-wrap pe-sm-3'>
      <CreatePet isEdit={true} content={pet} />
    </div>
  );
};

AddPet.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AddPet;
