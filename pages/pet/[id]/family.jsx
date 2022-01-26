import Layout from 'components/Layout';
import PageTitle from 'components/pagetitle/PageTitle';
import { FiPlusCircle } from 'react-icons/fi';
import PetCard from 'components/petcard/PetCard';
import axiosClient from 'axiosSetup';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useAuth } from 'app/authContext';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const Family = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate } = useSWR(
    id ? `/pets/${id}/siblings` : null,
    id ? fetcher : null
  );

  const {
    data: following,
    error: errorGetFollowing,
    mutateFollowing,
  } = useSWR(id ? `/following/following` : null, id ? fetcher : null);

  if (error || errorGetFollowing) return <div>failed to load</div>;
  if (!data || !following) return <div>loading...</div>;

  const handleClick = (id, index) => () => {
    router.push(`/${index == 0 ? 'user' : 'pet'}/${id}`);
  };

  const linkToAddPet = () => {
    router.push(`/pet/create`);
  };

  const linkToEditPet = () => {
    router.push(`/pet/${id}/edit`);
  };

  const isOwner = data && user?.id === data[0].id;
  return (
    <div className='row w-100'>
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
                isUser={index === 0}
                hideButton={index === 0}
                pet={value}
                buttonCallback={isOwner ? linkToEditPet : null}
                buttonLabel={isOwner ? 'Edit' : null}
                onClick={handleClick(value.id, index)}
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

Family.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Family;
