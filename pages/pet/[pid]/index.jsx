import Layout from 'components/Layout';
import ProfileBackground from 'components/profilebackground/ProfileBackground2';
import ProfileDetail from 'components/profiledetail/ProfileDetail';

const myProfile = {
  first_name: 'Dinh Khoat',
  last_name: 'Tran',
  avatar: 'https://picsum.photos/200',
  background: 'https://picsum.photos/928/250',
  email: 'tdkhoat@gmail.com',
};

const Profile = ({ query }) => {
  const { pid } = query;
  console.log(pid);
  return (
    <Layout>
      <div className='row w-100 justify-content-center'>
        <div className='col-12 mb-3 pe-0' style={{ maxWidth: 1000 }}>
          <ProfileBackground profile={myProfile} />
        </div>
        <div className='col-12 pe-0' style={{ maxWidth: 1000 }}>
          <ProfileDetail />
        </div>
      </div>
    </Layout>
  );
};

Profile.getInitialProps = async ({ query }) => {
  return { query };
};

export default Profile;
