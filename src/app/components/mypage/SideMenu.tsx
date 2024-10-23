'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import S from './SideMenu.module.scss';
import Image from 'next/image';
import MyProfileIcon from '@/images/sidemenuIcon/myprofile-Icon.svg';
import ReservationHistoryIcon from '@/images/sidemenuIcon/reservationhistory-Icon.svg';
import MyExperienceManagementIcon from '@/images/sidemenuIcon/myexperiencemanagement-Icon.svg';
import ReservationStatusIcon from '@/images/sidemenuIcon/reservationstatus-Icon.svg';
import ProfileButtonIcon from '@/images/sidemenuIcon/profile-button-icon.svg';
import DefaultProfileImage from '@/images/profiles/default-profile.svg'; // 기본 프로필 이미지 경로
import { useUserQuery } from '@/queries/useUserQuery'; // 유저 쿼리 import

const SideMenu: React.FC = () => {
  const { data: userInfo } = useUserQuery(); // 유저 정보 가져오기
  const profileImageUrl = userInfo?.profileImageUrl || null; // 프로필 이미지 URL

  const pathname = usePathname();

  return (
    <aside className={S.sideMenu}>
      <div className={S.profileContainer}>
        <div className={S.profileImageWrapper}>
          <Image
            src={profileImageUrl || DefaultProfileImage} // profileImageUrl이 null일 때 기본 이미지 사용
            alt="Profile"
            layout="fill" // 부모 요소의 크기에 맞춰서 이미지 크기 조절
            objectFit="cover" // 이미지가 부모 요소의 비율에 맞춰 잘리도록 설정
            className={S.profileImage} // 원형 스타일을 위한 클래스
          />
        </div>
        <div className={S.editIcon}>
          <Image src={ProfileButtonIcon} alt="Edit Profile" className={S.editButtonIcon} />
        </div>
      </div>
      <nav className={S.menu}>
        <ul>
          <li className={pathname === '/mypage/myprofile' ? S.active : ''}>
            <Link href="/mypage/myprofile">
              <Image src={MyProfileIcon} alt="My Profile" className={S.menuIcon} />내 정보
            </Link>
          </li>
          <li className={pathname === '/mypage/reservationhistory' ? S.active : ''}>
            <Link href="/mypage/reservationhistory">
              <Image src={ReservationHistoryIcon} alt="Reservation History" className={S.menuIcon} />
              예약 내역
            </Link>
          </li>
          <li className={pathname === '/mypage/myexperiencemanagement' ? S.active : ''}>
            <Link href="/mypage/myexperiencemanagement">
              <Image src={MyExperienceManagementIcon} alt="My Experience Management" className={S.menuIcon} />내 체험
              관리
            </Link>
          </li>
          <li className={pathname === '/mybookingstatus' ? S.active : ''}>
            <Link href="/mybookingstatus">
              <Image src={ReservationStatusIcon} alt="Reservation Status" className={S.menuIcon} />
              예약 현황
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
