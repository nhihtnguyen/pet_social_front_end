import CreatePost from 'components/CreatePost';
import Layout from 'components/Layout';

const Create = () => {
  return (
    <div className='row ms-0 pe-2 mb-3 justify-content-center w-100'>
      <CreatePost />
    </div>
  );
};

Create.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Create;
