import { Authentication } from '@/types/auth';
import { axiosInstance } from './setupAxios';

interface SignupParams extends Authentication {
  nickname: string;
}

export const signup = async ({ email, password, nickname }: SignupParams) => {
  const { data } = await axiosInstance.post('/users', { email, password, nickname });
  return data;
};
