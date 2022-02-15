import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import LoadAssets from 'components/LoadAssets';
import FloatingButton from 'components/floatingbutton/FloatingButton';
import { FiPlus, FiShoppingBag } from 'react-icons/fi';

const Adoption = () => {
  return (
    <div className='row w-100 m-0 p-0 pe-sm-3'>
      <div className='col-xl-12 p-0 middle-wrap'>
        <PageTitle title={'Pet Adoption'} />

        <h2>Coming soon.</h2>
      </div>
    </div>
  );
};

Adoption.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Adoption;
