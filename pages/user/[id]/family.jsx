import Layout from 'components/Layout';
import PageTitle from 'components/pagetitle/PageTitle';
import PetCard from 'components/petcard/PetCard';
import axiosClient from 'axiosSetup';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useAuth } from 'app/authContext';
import { FiPlusCircle } from 'react-icons/fi';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const MyPet = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate } = useSWR(
    id ? `/pets?user_id=${id}` : null,
    id ? fetcher : null
  );

  const {
    data: following,
    error: errorGetFollowing,
    mutateFollowing,
  } = useSWR(id ? `/following/following` : null, id ? fetcher : null);

  if (error || errorGetFollowing) return <div>failed to load</div>;
  if (!data || !following) return <div>loading...</div>;

  const handleClick = (id) => () => {
    router.push(`/pet/${id}`);
  };

  const linkToAddPet = () => {
    router.push(`/pet/create`);
  };

  const isOwner = user?.id === Number(id);

  return (
    <div
      className='row w-100'
      style={{
        transition: 'top 2s ease 0s',
      }}
    >
      <div className='col-xl-12 pe-0'>
        <PageTitle
          title='Family'
          shortcutButtons={
            isOwner
              ? [
                  {
                    icon: <FiPlusCircle />,
                    label: 'Add pet',
                    onClick: linkToAddPet,
                  },
                ]
              : []
          }
        />
        <div className='row'>
          {data?.map((value, index) => (
            <div className='col-md-6 col-sm-6 pb-3' key={index}>
              <PetCard
                pet={value}
                hideButton={isOwner}
                onClick={handleClick(value.id)}
                mutate={mutate}
                mutateFollowing={mutateFollowing}
                followed={!following.every((pet) => pet.id !== value.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

MyPet.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default MyPet;
