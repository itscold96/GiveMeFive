'use client';

import Image from 'next/image';
import S from './Header.module.scss';
import logoImg from '@/images/logos/logo-md.svg';
import Link from 'next/link';

import { usePersistStore } from '@/hooks/usePersistStore';
import { useUserStore } from '@/stores/useUserStore';
import defaultProfileImg from '@/images/profiles/default-profile.svg';
import notificationIcon from '@/images/icons/Icon-notification.svg';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { getUserInfo } from '@/fetches/getUserInfo';

export default function Header() {
  const user = usePersistStore(useUserStore, state => state.user);
  const { logout, setUser } = useUserStore();
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    const updateUser = async () => {
      if (!accessToken) {
        // accessToken이 없다면 logout 시킴
        // logout: 유저, 토큰 정보 초기화
        logout();
        return;
      }

      try {
        // 새로운 유저 정보로 업데이트 시도
        const userInfo = await getUserInfo();
        const { email, nickname, profileImageUrl } = userInfo;

        setUser({ email, nickname, profileImageUrl });
      } catch (error) {
        if (error) {
          // 리프레시 토큰 만료 등의 이유로, 유저 데이터를 받아오지 못한다면 로그아웃
          logout();
        }
      }
    };

    updateUser();
  }, []);

  return (
    <header className={S.headerContainer}>
      <div className={S.headerContents}>
        <Link href="/" className={S.headerLogo}>
          <Image src={logoImg} alt="로고 이미지" width={172} height={30} priority />
        </Link>
        {user ? (
          <div className={S.loggedInContainer}>
            <button className={S.notification}>
              <Image src={notificationIcon} alt="프로필 이미지" width={20} height={20} />
            </button>
            <article className={S.verticalSeparator} />
            <div className={S.profileContainer}>
              <Image
                src={user?.profileImageUrl || defaultProfileImg}
                alt="프로필 이미지"
                width={32}
                height={32}
                priority
              />
              <p>{user?.nickname}</p>
            </div>
          </div>
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
