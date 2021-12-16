import UploadImage from 'components/uploadimage/UploadImage';
import Layout from 'components/Layout';

const Create = () => {
  return (
    <div className='row ms-0 pe-2 mb-3 justify-content-center w-100'>
      <UploadImage mint={true} />
    </div>
  );
};

Create.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Create;
