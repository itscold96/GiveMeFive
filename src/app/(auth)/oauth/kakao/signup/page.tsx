'use client';

import SocialSignupNicknameForm from '@/app/components/auth/SocialSignupNicknameForm';
import { oauthSignup } from '@/fetches/oauthSignup';
import { useUserStore } from '@/stores/useUserStore';
import { LoginReturn } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KakaoSignup() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [code, setCode] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const responseCode = searchParams.get('code');
    if (responseCode) {
      setCode(responseCode);
    }
  }, []);

  const handleKakaoSignupNicknameSubmit = async (nickname: string) => {
    const data = await oauthSignup({ provider: 'kakao', nickname, code });
    const { user, accessToken, refreshToken } = data as LoginReturn;
    setUser({ user, accessToken, refreshToken });

    router.replace('/');
  };

  return <SocialSignupNicknameForm onSubmit={handleKakaoSignupNicknameSubmit} />;
}
