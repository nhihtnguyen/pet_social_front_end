import Layout from 'components/Layout';
import ProfileBackground from 'components/profilebackground/ProfileBackground2';
import PostUser from 'components/PostCardRow';
import axiosClient from 'axiosSetup';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const fetcher = (url) => axiosClient.get(url).then((res) => res.data);
import useInfinitePagination from 'hooks/useInfinitePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-bootstrap';

const Posts = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: pet, error: errorLoadInfo } = useSWR(`/pets/${id}`, fetcher);

  const {
    paginatedData: paginatedPosts,
    size,
    setSize,
    mutate,
    error: errorLoadPosts,
    isReachedEnd,
    loadingMore,
  } = useInfinitePagination(`/pets/${id}/posts?`);

  if (errorLoadInfo || errorLoadPosts)
    return <div>failed to load . {errorLoadPosts}</div>;
  if (!pet || !paginatedPosts) return <div>loading...</div>;

  return (
    <div className='row w-100 m-0 p-0 pe-sm-3'>
      <div className='col-xl-12 mb-3 p-0'>
        <ProfileBackground profile={pet} />
      </div>
      <div className='col p-0'>
        <InfiniteScroll
          next={() => setSize(size + 1)}
          hasMore={!isReachedEnd}
          loader={<Spinner animation='border' />}
          endMessage={<p>Doesn't has more posts yet.</p>}
          dataLength={paginatedPosts?.length ?? 0}
        >
          {paginatedPosts.map((post, index) => {
            pet.first_name = pet.name;
            pet.last_name = '';

            return <PostUser post={{ User: pet, ...post }} key={index} />;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

Posts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Posts;
