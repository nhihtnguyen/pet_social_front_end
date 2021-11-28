import { Fragment } from "react";
import Header from "../../components/header/Header";
import LeftNav from "../../components/leftnav/LeftNav";
import PageTitle from "../../components/pagetitle/PageTitle";
import RightNav from "../../components/rightnav/RightNav";
import UserCard from "../../components/usercard/UserCard";
const Follower = () => {
  return (
    <Fragment>
      <Header />
      <LeftNav />
      <RightNav />

      <div className='main-content right-chat-active'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left pe-0'>
            <div className='row'>
              <div className='col-xl-12'>
                <PageTitle title='Follower' />
                <div className='row ps-2 pe-2'>
                  {/* api get list follow */}
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Follower;
