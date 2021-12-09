import { Fragment } from 'react';
import Header from '../../components/header/Header';
import LeftNav from '../../components/leftnav/LeftNav';
import PageTitle from '../../components/pagetitle/PageTitle';
import RightNav from '../../components/rightnav/RightNav';
import EventCard from '../../components/eventcard/EventCard';

const Event = () => {
  return (
    <Fragment>
      <Header />
      <LeftNav />

      <div className='main-content'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left pe-0'>
            <div className='row w-100'>
              <div className='col-xl-12'>
                <PageTitle title='Event' />
                <div className='row ps-2 pe-2'>
                  {/* api get list follow */}
                  {[1, 2, 3, 4, 5, 6, 7].map((value) => {
                    return (
                      <div key={value} className='col pe-2 ps-2'>
                        <EventCard />
                      </div>
                    );
                  })}
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
