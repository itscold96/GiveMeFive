import React from 'react';
import Link from 'next/link';
import styles from './SideMenu.module.scss';

const SideMenu: React.FC = () => {
  return (
    <aside className={styles.sideMenu}>
      <nav className={styles.menu}>
        <ul>
          <li>
            <Link href="/mypage/myprofile">내 정보</Link>
          </li>
          <li>
            <Link href="/mypage/reservationhistory">예약 내역</Link>
          </li>
          <li>
            <Link href="/mypage/myexperiencemanagement">내 체험 관리</Link>
          </li>
          <li>예약 현황</li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
