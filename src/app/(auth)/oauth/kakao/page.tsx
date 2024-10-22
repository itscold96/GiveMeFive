'use client';

import { oauthSignin } from '@/fetches/oauthSignin';
import { useUserStore } from '@/stores/useUserStore';
import { LoginReturn } from '@/types/auth';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectKakao() {
  const router = useRouter();
  const { setUser } = useUserStore();

  useEffect(() => {
    // useSearchParams를 사용하지 않는 이유
    // useSearchParams를 쓰기 위해서는 Suspense로 감싸주어야 한다는 빌드에러가 발생하여
    // 이를 해결하기 위해 URLSearchParams를 사용
    // => Suspense로 한 번 감싸주는 것이 오히려 한 번 감싸는 컴포넌트를 새로 만들어야 하므로 코드 가독성이 떨어지고,
    // 어차피 useEffect를 사용하므로 URLSearchParams를 사용함.
    // window 객체는 SSR 시 존재하지 않으므로 useEffect 내부에서 사용.
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    const fetcher = async () => {
      try {
        const data = await oauthSignin({ provider: 'kakao', code: code });
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

  return <></>;
}
