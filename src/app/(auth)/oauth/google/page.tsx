'use client';

import { oauthSignin } from '@/fetches/oauthSignin';
import { useUserStore } from '@/stores/useUserStore';
import { LoginReturn } from '@/types/auth';
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

export default function RedirectGoogle() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetcher = async () => {
      const { data: token } = await axios.post('https://oauth2.googleapis.com/token', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/oauth/google',
        grant_type: 'authorization_code',
      });

      try {
        const { data } = await oauthSignin({ provider: 'google', code: token.id_token });
        const { user, accessToken, refreshToken } = data as LoginReturn;
        setUser({ user, accessToken, refreshToken });

        router.replace('/');
      } catch (error) {
        if (error instanceof AxiosError && error.status === 403) {
          router.replace(`/oauth/google/signup/${token.id_token}`);
        }
      }
    };

    fetcher();
  }, []);
  return <></>;
}
