import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import EventCard from 'components/eventcard/EventCard';
import LoadEvents from 'components/LoadEvents';

const Event = () => {
  return (
    <div className='middle-wrap pe-sm-3'>
      <PageTitle title='Event' />
      <LoadEvents />
      {/* api get list follow */}
      {/* {[1, 2, 3, 4, 5, 6, 7].map((value) => {
          return (
            <div key={value} className='col-sm-4 col-xs-12 p-0 pe-3 m-0 mb-3 '>
              <EventCard />
            </div>
          );
        })} */}
    </div>
  );
};

Event.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Event;
