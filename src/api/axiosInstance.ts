import axios from 'axios';

const TEAM_ID = '8-3';
const BASE_URL = `https://sp-globalnomad-api.vercel.app`;

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/${TEAM_ID}`,
  headers: {
    'Content-Type': 'application/json',
    'X-Team-Id': TEAM_ID,
  },
});
