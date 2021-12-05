import styles from '../../../styles/Explore.module.scss';
import Header from '../../../components/header/Header';
import LeftNav from '../../../components/leftnav/LeftNav';
import PageTitle from '../../../components/pagetitle/PageTitle';
import UploadImage from '../../../components/uploadimage/UploadImage';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { postActions, postSelector } from '../../../features/post/postSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <Header />
      <LeftNav />
      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left pe-0'>
            <div className='row w-100'>
              <div className='col-xl-12'>
                <div className='row ps-2 pe-1 justify-content-center'>
                  <UploadImage isEdit={true} content={post} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Edit.getInitialProps = async ({ query }) => {
  return { query };
};

export default Edit;
