import Layout from 'components/Layout';
import PageTitle from 'components/pagetitle/PageTitle';
import EventCard from 'components/eventcard/EventCard';

const Event = () => {
  return (
    <Layout>
      <div className='row w-100'>
        <div className='col-xl-12'>
          <PageTitle title='Event' />
          <div className='row ps-2 pe-2 pt-0'>
            {/* api get list follow */}
            {[1, 2, 3, 4, 5, 6, 7].map((value) => {
              return (
                <div key={value} className='col pe-2 ps-2 pb-3'>
                  <EventCard />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Event;
