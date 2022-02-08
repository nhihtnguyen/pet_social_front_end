import useSWRInfinite from 'swr/infinite';
import axiosClient from 'axiosSetup';

const PAGE_SIZE = 5;

const fetcher = async (url) => axiosClient.get(url).then((res) => res.data);

const useInfinitePagination = (url, pageSize = PAGE_SIZE) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return [];
    }
    return `${url}&page=${pageIndex + 1}&limit=${pageSize}`;
  };

  const { data, size, setSize, mutate, error } = useSWRInfinite(
    getKey,
    fetcher,
    { persistSize: true }
  );
  const _mutate = (newData) => {
    mutate(() => [[newData], ...data]);
  };
  /* Data export from useSWRInfinite is a array of page that include rows. Flat function is used that get 1-dimension array  */
  const paginatedData = data?.flat();
  const isReachedEnd = data && data[data.length - 1]?.length < pageSize;
  const loadingMore = data && typeof data[size - 1] === 'undefined';

  return {
    paginatedData,
    size,
    setSize,
    error,
    mutate,
    isReachedEnd,
    loadingMore,
  };
};

export default useInfinitePagination;
