import PostUser from 'components/postuser/PostUser';
import Layout from 'components/Layout';
import PageTitle from 'components/pagetitle/PageTitle';
import UserCard from 'components/usercard/UserCard';

const Follower = () => {
  return (
    <div className='row w-100'>
      <div className='col-xl-12 pe-0'>
        <PageTitle title='Follower' />
        <div className='row'>
          {/* api get list follow */}
          {[1, 2, 3, 4, 5, 6, 7].map((value) => {
            return (
              <div key={value} className='col-md-3 col-sm-4 pe-2'>
                <UserCard />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Follower.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Follower;
