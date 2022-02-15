import Postcard from 'components/postcard/Postcard';
import { Spinner } from 'react-bootstrap';
import useInfinitePagination from 'hooks/useInfinitePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'components/Masonry';
import PostCardRow from 'components/PostCardRow';
import { useRouter } from 'next/router';
import { isMobile } from 'web3modal';
import { useState } from 'react';

const MasonryCard = ({ data }) => <Postcard value={data} className={`m-0`} />;

const LoadExplore = ({ refreshSignal, grid = true }) => {
  const router = useRouter();
  const search = router.query.search;
  const pageSize = Math.floor(
    document?.documentElement?.clientHeight &&
      document?.documentElement?.clientWidth
      ? (document?.documentElement?.clientHeight *
          document?.documentElement?.clientWidth) /
          (200 * 250)
      : 10
  );
  const {
    paginatedData: paginatedPosts,
    size,
    setSize,
    mutate,
    error,
    isReachedEnd,
    loadingMore,
  } = useInfinitePagination(
    pageSize ? `/posts/explore?${search ? `search=${search}&` : ''}` : null,
    pageSize
  );
  const [isMobile, setIsMobile] = useState(
    navigator?.userAgent?.toLowerCase()?.match(/mobile/i)
  );
  return (
    <div className='infinite-scroll-parent p-0'>
      {!paginatedPosts && !error ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <InfiniteScroll
          next={() => setSize(size + 1)}
          hasMore={!isReachedEnd}
          loader={<Spinner animation='border' />}
          dataLength={paginatedPosts?.length ?? 0}
          className='w-100 p-0'
          pullToRefresh
        >
          {grid ? (
            <Masonry
              // Provides the data for our grid items
              items={paginatedPosts || []}
              // Adds 8px of space between the grid cells
              columnGutter={12}
              // Sets the minimum column width to 172px
              columnWidth={172}
              // Pre-renders 5 windows worth of content
              overscanBy={5}
              // This is the grid item component
              render={MasonryCard}
              columnCount={isMobile ? 2 : undefined}
            />
          ) : (
            <div className='middle-wrap'>
              {paginatedPosts.map((post, index) => (
                <PostCardRow post={post} key={index} />
              ))}
            </div>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default LoadExplore;
