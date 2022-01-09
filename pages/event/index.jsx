import Layout from 'components/Layout';
import PageTitle from 'components/pagetitle/PageTitle';
import EventCard from 'components/eventcard/EventCard';

const Event = () => {
  return (
    <div className='row w-100'>
      <div className='col-xl-12 pe-0'>
        <PageTitle title='Event' />
        <div className='row ps-2 pt-0'>
          {/* api get list follow */}
          {[1, 2, 3, 4, 5, 6, 7].map((value) => {
            return (
              <div key={value} className='col p-0 mb-3 ms-1'>
                <EventCard />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Event.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Event;
