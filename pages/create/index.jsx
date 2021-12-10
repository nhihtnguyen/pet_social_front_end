import UploadImage from '../../components/uploadimage/UploadImage';
import Layout from 'components/Layout';

const Create = () => {
  return (
    <Layout>
      <div className='row ps-3 pe-1 justify-content-center w-100'>
        <UploadImage mint={true} />
      </div>
    </Layout>
  );
};

export default Create;
