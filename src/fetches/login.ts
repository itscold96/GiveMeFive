import { LoginParams, LoginReturn } from '@/types/auth';
import { axiosInstance } from './setupAxios';

export const login = async ({ email, password }: LoginParams): Promise<LoginReturn> => {
  const { data } = await axiosInstance.post('/auth/login', { email, password });
  return data;
};
