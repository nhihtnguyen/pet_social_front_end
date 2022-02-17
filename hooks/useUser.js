import axiosClient from 'axiosSetup';

const fetcher = async (url) => axiosClient.get(url).then((res) => res.data);

const useUser = (id) => {
  const { data, error } = useSWR(`/user/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
