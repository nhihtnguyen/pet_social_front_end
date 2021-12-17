import axios from 'axios';
import { host as serverHost } from 'config';

const client = axios.create({
  // baseURL: 'http://localhost:8080/api',
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .get(`${serverHost}/auth/refresh`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            console.log('Access token refreshed!');
            return client(originalRequest);
          }
        });
    }
    if (error.response) {
      return parseError(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
);

export default client;
