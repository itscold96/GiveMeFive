import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});
