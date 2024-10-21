'use client';

import SocialSignupNicknameForm from '@/app/components/auth/SocialSignupNicknameForm';
import { oauthSignup } from '@/fetches/oauthSignup';
import { useUserStore } from '@/stores/useUserStore';
import { LoginReturn } from '@/types/auth';
import { useRouter } from 'next/navigation';

export default function GoogleSignup({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { token } = params;

  const handleGoogleSignupNicknameSubmit = async (nickname: string) => {
    const data = await oauthSignup({ provider: 'google', nickname, code: token });
    const { user, accessToken, refreshToken } = data as LoginReturn;
    setUser({ user, accessToken, refreshToken });
    router.replace('/');
  };

  return <SocialSignupNicknameForm onSubmit={handleGoogleSignupNicknameSubmit} />;
}
