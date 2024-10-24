import { OauthSignupParams } from '@/types/oauth';
import { axiosInstance } from './setupAxios';

export const oauthSignup = async ({ provider, nickname, code }: OauthSignupParams) => {
  const { data } = await axiosInstance.post(`oauth/sign-up/${provider}`, {
    nickname,
    redirectUri: 'http://localhost:3000/oauth/${provider}',
    token: code,
  });

  return data;
};
