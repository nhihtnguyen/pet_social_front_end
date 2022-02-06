import Layout from 'components/Layout';
import ProfileBackground from 'components/profilebackground/ProfileBackground';
import ProfileDetail from 'components/ProfileDetail';

const Profile = () => {
  return (
    <div className='row w-100 justify-content-center'>
      <div className='col-12 mb-3 pe-0' style={{ maxWidth: 1000 }}>
        <ProfileBackground />
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

export default Profile;
