import { SignupReturn } from '@/types/auth';
import { axiosAuth } from './setupAxios';

export const patchUserInfo = async (userData: Partial<SignupReturn>): Promise<SignupReturn> => {
  const { data } = await axiosAuth.patch('users/me', userData);
  return data;
};
