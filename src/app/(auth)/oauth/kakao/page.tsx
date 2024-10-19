'use client';

import { axiosInstance } from '@/fetches/setupAxios';
import { useUserStore } from '@/stores/useUserStore';
import { LoginReturn } from '@/types/auth';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectKakao() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetcher = async () => {
      try {
        const { data } = await axiosInstance.post('oauth/sign-in/kakao', {
          redirectUri: 'http://localhost:3000/oauth/kakao',
          token: code,
        });
        const { user, accessToken, refreshToken } = data as LoginReturn;
        setUser({ user, accessToken, refreshToken });
        router.replace('/');
      } catch (error) {
        if (error instanceof AxiosError && error.status === 403) {
          router.replace(`/oauth/kakao/signup/${code}`);
        }
      }
    };

    fetcher();
  }, []);

  return <div>RedirectKakao</div>;
}
