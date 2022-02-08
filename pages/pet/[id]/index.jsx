import Layout from 'components/Layout';
import ProfileBackground from 'components/profilebackground/ProfileBackground2';
import ProfileDetail from 'components/ProfileDetail';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import axiosClient from 'axiosSetup';

const fetcher = async (url) => axiosClient.get(url).then((res) => res.data);

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: pet, error } = useSWR(
    id ? `/pets/${id}` : null,
    id ? fetcher : null
  );
  if (error) return <div>failed to load</div>;
  if (!pet) return <div>loading...</div>;

  const properties = [
    { key: 'Age', value: pet.age },
    { key: 'Gender', value: pet.gender ? 'Male' : 'Female' },
    { key: 'Breed', value: pet.type },
  ];

  return (
    <div className='row w-100 justify-content-center p-0 m-0 pe-sm-3'>
      <div className='col-12 mb-3 p-0' style={{ maxWidth: 1000 }}>
        <ProfileBackground profile={pet} />
      </div>
      <div className='col-12 p-0' style={{ maxWidth: 1000 }}>
        <ProfileDetail description={'nonono'} properties={properties} />
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

/*
export const getStaticProps = async ({ params }) => {
  let pet = {};
  const { id } = params;

  try {
    const response = await axiosClient.get(`${serverHost}/pets/${id}`);
    pet = response.data;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      pet,
      id,
    },
  };
};

export async function getStaticPaths() {
  let pets = [];
  try {
    const response = await axiosClient.get(`${serverHost}/pets`);
    pets = response.data;
  } catch (error) {
    console.error(error);
  }

  const paths = pets.map((pet) => ({
    params: { id: `${pet.id}` },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}
*/
export default Profile;
