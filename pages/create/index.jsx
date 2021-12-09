import styles from '../../styles/Explore.module.scss';
import Header from '../../components/header/Header';
import LeftNav from '../../components/leftnav/LeftNav';
import PageTitle from '../../components/pagetitle/PageTitle';
import UploadImage from '../../components/uploadimage/UploadImage';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postActions, postSelector } from '../../features/post/postSlice';
import { useEffect } from 'react';

const Create = () => {
  return (
    <div>
      <Header />
      <LeftNav />
      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left pe-0'>
            <div className='row ps-2 pe-1 justify-content-center w-100'>
              <UploadImage mint={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
