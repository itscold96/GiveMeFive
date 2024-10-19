'use client';

import SocialSignupNicknameForm from '@/app/components/auth/SocialSignupNicknameForm';
import { axiosInstance } from '@/fetches/setupAxios';
import { useUserStore } from '@/stores/useUserStore';
import { LoginReturn } from '@/types/auth';
import { useRouter } from 'next/navigation';

export default function GoogleSignup({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { token } = params;

  const handleGoogleSignupSubmit = async (nickname: string) => {
    const { data } = await axiosInstance.post('oauth/sign-up/google', {
      nickname,
      redirectUri: 'http://localhost:3000/oauth/google',
      token,
    });
    const { user, accessToken, refreshToken } = data as LoginReturn;
    setUser({ user, accessToken, refreshToken });
    router.replace('/');
  };

  return <SocialSignupNicknameForm onSubmit={handleGoogleSignupSubmit} />;
}
