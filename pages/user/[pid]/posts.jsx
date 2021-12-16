import Layout from 'components/Layout';
import ProfileBackground from 'components/profilebackground/ProfileBackground';
import PostUser from 'components/postuser/PostUser';

const myProfile = {
  first_name: 'Dinh Khoat',
  last_name: 'Tran',
  avatar: 'https://picsum.photos/200',
  background: 'https://picsum.photos/928/250',
  email: 'tdkhoat@gmail.com',
};

const Profile = () => {
  return (
    <div className='row w-100'>
      <div className='col-xl-12 mb-3 pe-0'>
        <ProfileBackground profile={myProfile} />
      </div>
      <div className='col pe-0'>
        <PostUser />
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Profile;
