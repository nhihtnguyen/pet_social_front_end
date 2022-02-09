import Layout from 'components/Layout';
import CreateEvent from 'components/CreateEvent';

const AddEvent = () => {
  return (
    <div className='middle-wrap pe-sm-3'>
      <CreateEvent />
    </div>
  );
};

AddEvent.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AddEvent;
