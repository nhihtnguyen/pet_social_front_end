import { Fragment } from "react";
import Header from "../../components/header/Header";
import LeftNav from "../../components/leftnav/LeftNav";
import ProfileBackground from "../../components/profilebackground/ProfileBackground";
import RightNav from "../../components/rightnav/RightNav";
import PostUser from "../../components/postuser/PostUser";
import ProfileDetail from "../../components/profiledetail/ProfileDetail";
const Profile = () => {
  return (
    <Fragment>
      <Header />
      <LeftNav />
      <RightNav />

      <div className='main-content right-chat-active'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left pe-0'>
            <div className='row'>
              <div className='col-xl-12 mb-3'>
                <ProfileBackground />
              </div>
              <div className='col-xl-4 col-xxl-3 col-lg-4 pe-0'>
                <ProfileDetail />
              </div>
              <div className='col-xl-8 col-xxl-9 col-lg-8'>
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
