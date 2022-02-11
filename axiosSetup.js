import axios from 'axios';
const serverHost = process.env.NEXT_PUBLIC_BACKEND_URL;

const client = axios.create({
  baseURL: serverHost,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': `${serverHost}`,
  },
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .get(`${serverHost}/auth/refresh`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            console.log('Access token refreshed!');
            const accessToken = res.data.accessToken;
            if (accessToken) {
              localStorage.setItem('access_token', accessToken);
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              client.defaults.Authorization = accessToken;
            }
            return client(originalRequest);
          }
        })
        .catch((error) => {
          return error;
        });
    }
    if (error.response) {
      return error.response;
    } else {
      return Promise.reject(error);
    }
  }
);

export default client;
