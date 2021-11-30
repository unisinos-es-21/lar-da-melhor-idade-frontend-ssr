import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://lar-da-melhor-idade-backend.herokuapp.com',
});

client.interceptors.request.use(
  (config) => {
    if (config.url !== 'auth/authenticate') {
      const Authorization = localStorage.getItem('token');

      if (Authorization) {
        config.headers.Authorization = `Bearer ${Authorization}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
