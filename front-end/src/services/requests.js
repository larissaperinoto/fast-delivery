import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT || '3001'}`,
});

export default async function requestProducts() {
  const { data } = await api.get('products');
  return data;
}
