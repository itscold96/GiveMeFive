'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import S from './SideMenu.module.scss';
import MyProfileIcon from '@/images/sidemenuIcon/myprofile-Icon.svg';
import ReservationHistoryIcon from '@/images/sidemenuIcon/reservationhistory-Icon.svg';
import MyExperienceManagementIcon from '@/images/sidemenuIcon/myexperiencemanagement-Icon.svg';
import ReservationStatusIcon from '@/images/sidemenuIcon/reservationstatus-Icon.svg';
import ProfileButtonIcon from '@/images/sidemenuIcon/profile-button-icon.svg';
import ProfileImage from '@/images/sidemenuIcon/profile-image.svg';

const SideMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className={S.sideMenu}>
      <div className={S.profileContainer}>
        <ProfileImage />
        <div className={S.editIcon}>
          <ProfileButtonIcon />
        </div>
      </div>
      <nav className={S.menu}>
        <ul>
          <li className={pathname === '/mypage/myprofile' ? S.active : ''}>
            <Link href="/mypage/myprofile">
              <MyProfileIcon className={S.menuIcon} />내 정보
            </Link>
          </li>
          <li className={pathname === '/mypage/reservationhistory' ? S.active : ''}>
            <Link href="/mypage/reservationhistory">
              <ReservationHistoryIcon className={S.menuIcon} />
              예약 내역
            </Link>
          </li>
          <li className={pathname === '/mypage/myexperiencemanagement' ? S.active : ''}>
            <Link href="/mypage/myexperiencemanagement">
              <MyExperienceManagementIcon className={S.menuIcon} />내 체험 관리
            </Link>
          </li>
          <li className={pathname === '/mypage/reservationstatus' ? S.active : ''}>
            <ReservationStatusIcon className={S.menuIcon} />
            예약 현황
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
