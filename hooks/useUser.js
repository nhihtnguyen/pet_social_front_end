import axiosClient from 'axiosSetup';
import { host as serverHost } from 'config';

const fetcher = (...args) => axiosClient(...args).then((res) => res.json());

const useUser = (id) => {
  const { data, error } = useSWR(`${serverHost}/user/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
