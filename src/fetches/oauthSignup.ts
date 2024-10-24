import { OauthSignupParams } from '@/types/oauth';
import { axiosInstance } from './setupAxios';

export const oauthSignup = async ({ provider, nickname, code }: OauthSignupParams) => {
  const { data } = await axiosInstance.post(`oauth/sign-up/${provider}`, {
    nickname,
    redirectUri:
      provider === 'kakao'
        ? process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI
        : `http://localhost:3000/oauth/${provider}`,
    token: code,
  });

  return data;
};
