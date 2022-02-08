import Layout from 'components/Layout';
import EditProfile from 'components/EditProfile';

const PersonalInformation = () => {
  return (
    <div className='middle-wrap pe-sm-3'>
      <EditProfile />
    </div>
  );
};

PersonalInformation.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default PersonalInformation;
