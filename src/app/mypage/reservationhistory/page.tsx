import React from 'react';
import SideMenu from '../../components/SideMenu';
import styles from '../mypage.module.scss';

const ReservationHistory: React.FC = () => {
  return (
    <div className={styles['reservationhistory']}>
      <div className={styles['side-menu-container']}>
        <SideMenu />
      </div>
    </div>
  );
};

export default ReservationHistory;
