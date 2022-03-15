import Layout from 'components/Layout';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import PageTitle from 'components/PageTitle';
import LoadMarket from 'components/LoadMarket';
import { FiPlus, FiBriefcase } from 'react-icons/fi';
import { Tabs, Tab } from 'react-bootstrap';

const Market = () => {
  return (
    <div className='middle-wrap pe-sm-3'>
      <PageTitle title={'Market'} />
      <Tabs
        defaultActiveKey='all'
        id='item-detail-tab'
        className='mb-3 bg-white p-2 rounded-xxl shadow-xss mytab border-0'
      >
        <Tab
          eventKey='all'
          title='All'
          tabClassName='bg-transparent font-xssss fw-700 border-0 text-dark'
        >
          <LoadMarket />
        </Tab>
        <Tab
          eventKey='owned'
          title='My listing'
          tabClassName='bg-transparent font-xssss fw-700 border-0 text-dark'
        >
          <LoadMarket creator={true} />
        </Tab>
      </Tabs>
    </div>
  );
};

Market.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Market;
