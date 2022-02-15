import Layout from 'components/Layout';
import ProfileBackground from 'components/profilebackground/ProfileBackground';
import ProfileDetail from 'components/ProfileDetail';
import axiosClient from 'axiosSetup';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: profile, error } = useSWR(
    id ? `/users/${id}` : null,
    id ? fetcher : null
  );
  console.log(profile);
  return (
    <div className='row w-100 justify-content-center p-0 m-0 pe-sm-3'>
      <div className='col-12 mb-3 p-0' style={{ maxWidth: 1000 }}>
        <ProfileBackground />
      </div>
      <div className='col-12 p-0' style={{ maxWidth: 1000 }}>
        <ProfileDetail description={profile?.description} />
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Profile;
