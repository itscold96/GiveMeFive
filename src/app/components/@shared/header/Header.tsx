'use client';

import Image from 'next/image';
import S from './Header.module.scss';
import logoImg from '@/images/logos/logo-md.svg';
import Link from 'next/link';

import { useUserStore } from '@/stores/useUserStore';
import { useEffect } from 'react';
import { useUserQuery } from '@/queries/useUserQuery';
import LoggedInContainer from './LoggedInContainer';

export default function Header() {
  const { data: user, isError } = useUserQuery();
  const { logout, setUser } = useUserStore();

  // 이전에 로그아웃을 하지 않고, 사이트에 재접속 한 경우
  // 유저 전역 상태는 없지만,
  // accessToken, refreshToken은 쿠키에 그대로 남아있다.
  // 이를 통해 자동 로그인을 시키는 기능을 위해,
  // 서버에 유저 정보를 요청하는 과정이 필요하다.
  // 만약, 그 사이에 accessToken이 만료되었다면 refreshToken으로 토큰을 업데이트하고,
  // refreshToken까지 만료되었다면 쿠기를 제거하여 완전히 로그아웃한다.
  // useEffect를 통해 페이지 새로 고침 시에도 마찬가지로 작동한다.
  useEffect(() => {
    if (user) {
      // 새로 유저 정보를 받아왔으므로 전역 상태 업데이트
      setUser({ user });
    }
    if (isError) {
      // 리프레시 토큰 만료 등의 이유로, 유저 데이터를 받아오지 못한다면 로그아웃
      logout();
    }
  }, [user, isError]);

  return (
    <header className={S.headerContainer}>
      <div className={S.headerContents}>
        <Link href="/" className={S.headerLogo}>
          <Image src={logoImg} alt="로고 이미지" width={172} height={30} priority />
        </Link>
        {user ? (
          <LoggedInContainer nickname={user.nickname} profileImageUrl={user.profileImageUrl} logout={logout} />
        ) : (
          <div className={S.notLoggedInContainer}>
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        )}
      </div>
    </header>
  );
}
