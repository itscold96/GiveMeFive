'use client';

import SocialSignupNicknameForm from '@/app/components/auth/SocialSignupNicknameForm';
import { oauthSignup } from '@/fetches/oauthSignup';
import { useUserStore } from '@/stores/useUserStore';
import { LoginReturn } from '@/types/auth';
import { useRouter } from 'next/navigation';

export default function KakaoSignup({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { token } = params;

  const handleKakaoSignupNicknameSubmit = async (nickname: string) => {
    const data = await oauthSignup({ provider: 'kakao', nickname, code: token });
    const { user, accessToken, refreshToken } = data as LoginReturn;
    setUser({ user, accessToken, refreshToken });

    router.replace('/');
  };

  return <SocialSignupNicknameForm onSubmit={handleKakaoSignupNicknameSubmit} />;
}
