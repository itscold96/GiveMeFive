import { Authentication } from '@/types/auth';
import { axiosInstance } from './setupAxios';

export const login = async ({ email, password }: Authentication) => {
  const data = await axiosInstance.post('/auth/login', { email, password });
  return data;
};
