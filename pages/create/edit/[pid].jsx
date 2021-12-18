import UploadImage from 'components/createpost/CreatePost';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from 'components/Layout';

const Edit = ({ query }) => {
  const [post, setPost] = useState({});
  const { pid } = query;

  useEffect(() => {
    console.log(pid, query);
    if (pid) {
      axios
        .get('/posts/' + pid)
        .then((req) => {
          console.log(req.data);
          setPost(req.data);
        })
        .catch((err) => {
          // loggg
          console.log(err);
        });
    }
  }, [pid]);
  return (
    <div className='row ms-0 pe-2 mb-3 justify-content-center w-100'>
      <UploadImage isEdit={true} content={post} />
    </div>
  );
};

Edit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

Edit.getInitialProps = async ({ query }) => {
  return { query };
};

export default Edit;
