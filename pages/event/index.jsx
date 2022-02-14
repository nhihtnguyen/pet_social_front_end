import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import EventCard from 'components/eventcard/EventCard';
import LoadEvents from 'components/LoadEvents';
import { Tabs, Tab } from 'react-bootstrap';
import { FiPlusCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';
const Event = () => {
  const router = useRouter();
  const linkToCreateEvent = () => {
    router.push('/event/create');
  };
  return (
    <div className='middle-wrap pe-sm-3'>
      <PageTitle
        title='Event'
        shortcutButtons={[
          {
            label: 'New event',
            icon: <FiPlusCircle />,
            onClick: linkToCreateEvent,
          },
        ]}
      />
      <Tabs
        defaultActiveKey='all'
        id='item-detail-tab'
        className='mb-3 bg-white p-2 rounded-xxl shadow-xss mytab'
      >
        <Tab
          eventKey='all'
          title='All'
          tabClassName='bg-transparent font-xssss fw-700 border-0 text-dark'
          className='pe-2'
        >
          <LoadEvents />
        </Tab>
        <Tab
          eventKey='ongoing'
          title='Ongoing'
          tabClassName='bg-transparent font-xssss fw-700 border-0 text-dark'
          className='pe-2'
        >
          <LoadEvents filter='ongoing' />
        </Tab>
        <Tab
          eventKey='incoming'
          title='Incoming'
          tabClassName='bg-transparent font-xssss fw-700 border-0 text-dark'
          className='pe-2'
        >
          <LoadEvents filter='incoming' />
        </Tab>
        <Tab
          eventKey='closed'
          title='Closed'
          tabClassName='bg-transparent font-xssss fw-700 border-0 text-dark'
          className='pe-2'
        >
          <LoadEvents filter='closed' />
        </Tab>
      </Tabs>
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
