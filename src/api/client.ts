import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://lar-da-melhor-idade-backend.herokuapp.com',
});
