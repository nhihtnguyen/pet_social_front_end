import CreatePost from 'components/CreatePost';
import Layout from 'components/Layout';

const Create = () => {
  return (
    <div className='middle-wrap ms-0 pe-sm-3 mb-3'>
      <CreatePost />
    </div>
  );
};

Create.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Create;
