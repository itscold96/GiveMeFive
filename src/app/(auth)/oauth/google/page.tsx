'use client';

import { getGoogleJWT } from '@/fetches/getGoogleJWT';
import { oauthSignin } from '@/fetches/oauthSignin';
import { useUserStore } from '@/stores/useUserStore';
import { LoginReturn } from '@/types/auth';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

export default function RedirectGoogle() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetcher = async () => {
      const token = await getGoogleJWT(code);

      try {
        const data = await oauthSignin({ provider: 'google', code: token });
        const { user, accessToken, refreshToken } = data as LoginReturn;
        setUser({ user, accessToken, refreshToken });

        router.replace('/');
      } catch (error) {
        if (error instanceof AxiosError && error.status === 403) {
          router.replace(`/oauth/google/signup/${token}`);
        }
      }
    };

    fetcher();
  }, []);
  return <></>;
}
