import { Fragment } from "react";
import Header from "../../components/header/Header";
import LeftNav from "../../components/leftnav/LeftNav";
import PageTitle from "../../components/pagetitle/PageTitle";
import RightNav from "../../components/rightnav/RightNav";
import EventCard from "../../components/eventcard/EventCard";
const Event = () => {
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
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Event;
