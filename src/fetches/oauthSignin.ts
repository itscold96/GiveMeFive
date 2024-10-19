import { OauthSigninParams } from '@/types/auth';
import { axiosInstance } from './setupAxios';

export const oauthSignin = async ({ provider, code }: OauthSigninParams) => {
  const { data } = await axiosInstance.post(`oauth/sign-in/${provider}`, {
    redirectUri:
      provider === 'kakao' ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI : process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    token: code,
  });

  return { data };
};
