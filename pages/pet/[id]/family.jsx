import Layout from 'components/Layout';
import PageTitle from '../../../components/pagetitle/PageTitle';
import PetCard from '../../../components/petcard/PetCard';

const Family = () => {
  return (
    <div className='row w-100'>
      <div className='col-xl-12 pe-0'>
        <PageTitle title='Family' />
        <div className='row'>
          {[1, 2, 3, 4, 5, 6, 7].map((value) => (
            <div className='col-md-6 col-sm-6 pb-3' key={value}>
              <PetCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Family.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Family;
