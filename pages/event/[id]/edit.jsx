import CreateEvent from 'components/CreateEvent';
import Layout from 'components/Layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useAuth } from 'app/authContext';
import axiosClient from 'axiosSetup';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const AddEvent = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { id } = router.query;
  const { data: event, error } = useSWR(
    id ? `/events/${id}` : null,
    id ? fetcher : null
  );
  if (error) return <div>failed to load</div>;

  return (
    <div className='middle-wrap pe-sm-3'>
      <CreateEvent content={event} />
    </div>
  );
};

AddEvent.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AddEvent;
