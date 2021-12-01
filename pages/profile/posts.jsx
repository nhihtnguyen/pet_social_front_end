import { Fragment } from "react";
import Header from "../../components/header/Header";
import LeftNav from "../../components/leftnav/LeftNav";
import ProfileBackground from "../../components/profilebackground/ProfileBackground";
import RightNav from "../../components/rightnav/RightNav";
import PostUser from "../../components/postuser/PostUser";
import ProfileDetail from "../../components/profiledetail/ProfileDetail";
import FloatingButton from '../../components/floatingbutton/FloatingButton';
import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';

const myProfile = {
  first_name: 'Dinh Khoat',
  last_name: 'Tran',
  avatar: 'https://picsum.photos/200',
  background: 'https://picsum.photos/928/250',
  email: 'tdkhoat@gmail.com'
}

const Profile = () => {



  return (
    <Fragment>
      <Header />
      <LeftNav />


      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left pe-0'>
            <div className='row'>
              <div className='col-xl-12 mb-3'>
                <ProfileBackground profile={myProfile} />
              </div>
              <div className='col pe-0'>
                <PostUser />
              </div>

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
