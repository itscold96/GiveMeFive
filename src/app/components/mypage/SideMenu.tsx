'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SideMenu.module.scss';
import MyProfileIcon from '@/images/sidemenuIcon/myprofile-Icon.svg';
import ReservationHistoryIcon from '@/images/sidemenuIcon/reservationhistory-Icon.svg';
import MyExperienceManagementIcon from '@/images/sidemenuIcon/myexperiencemanagement-Icon.svg';
import ReservationStatusIcon from '@/images/sidemenuIcon/reservationstatus-Icon.svg';

const SideMenu: React.FC = () => {
  const pathname = usePathname(); // 현재 경로를 가져옴

  return (
    <aside className={styles.sideMenu}>
      <nav className={styles.menu}>
        <ul>
          <li className={pathname === '/mypage/myprofile' ? styles.active : ''}>
            <Link href="/mypage/myprofile">
              <MyProfileIcon className={styles.menuIcon} />내 정보
            </Link>
          </li>
          <li className={pathname === '/mypage/reservationhistory' ? styles.active : ''}>
            <Link href="/mypage/reservationhistory">
              <ReservationHistoryIcon className={styles.menuIcon} />
              예약 내역
            </Link>
          </li>
          <li className={pathname === '/mypage/myexperiencemanagement' ? styles.active : ''}>
            <Link href="/mypage/myexperiencemanagement">
              <MyExperienceManagementIcon className={styles.menuIcon} />내 체험 관리
            </Link>
          </li>
          <li className={pathname === '/mypage/reservationstatus' ? styles.active : ''}>
            <ReservationStatusIcon className={styles.menuIcon} />
            예약 현황
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
