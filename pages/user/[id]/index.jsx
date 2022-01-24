import Layout from 'components/Layout';
import { LayoutProfile } from 'components/Layout';
import ProfileBackground from 'components/profilebackground/ProfileBackground';
import ProfileDetail from '../../../components/profiledetail/ProfileDetail';
import axiosClient from 'axiosSetup';
import { host as serverHost } from 'config';
import useSWR from 'swr';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: user, error } = useSWR(`/users/${id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!user) return <div>loading...</div>;
  return (
    <div className='row w-100 justify-content-center'>
      <div className='col-12 mb-3 pe-0' style={{ maxWidth: 1000 }}>
        <ProfileBackground profile={user} id={id} />
      </div>
      <div className='col-12 pe-0' style={{ maxWidth: 1000 }}>
        <ProfileDetail />
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

/*
export const getStaticProps = async ({ params }) => {
  let user = {};
  const { id } = params;

  try {
    const response = await axiosClient.get(`${serverHost}/users/${id}`);
    user = response.data;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      user,
      id,
    },
  };
};
/*
export async function getStaticPaths() {
  let users = [];
  try {
    const response = await axiosClient.get(`${serverHost}/users`);
    users = response.data;
  } catch (error) {
    console.error(error);
  }

  const paths = users.map((user) => ({
    params: { id: `${user.id}` },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}
*/

export default Profile;
