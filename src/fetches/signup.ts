import { SignupParams, SignupReturn } from '@/types/auth';
import { axiosInstance } from './setupAxios';

export const signup = async ({ email, password, nickname }: SignupParams): Promise<SignupReturn> => {
  const { data } = await axiosInstance.post('/users', { email, password, nickname });
  return data;
};
