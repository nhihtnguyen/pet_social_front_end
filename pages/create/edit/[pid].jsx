import UploadImage from '../../../components/uploadimage/UploadImage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from 'components/Layout';

const content = {
  imageUrl: 'user.png',
  name: 'Aliqa Macale',
  email: 'support@gmail.com',
  media_URL: 'https://picsum.photos/200/300',
  caption: 'Helllele',
};

const Edit = ({ query }) => {
  const [post, setPost] = useState({});
  const { pid } = query;

  useEffect(() => {
    console.log(pid, query);
    if (pid) {
      axios
        .get('http://localhost:3001/posts/' + pid)
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
    <Layout>
      <div className='row w-100'>
        <div className='col-xl-12'>
          <div className='row ps-3 pe-1 justify-content-center'>
            <UploadImage isEdit={true} content={post} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

Edit.getInitialProps = async ({ query }) => {
  return { query };
};

export default Edit;
