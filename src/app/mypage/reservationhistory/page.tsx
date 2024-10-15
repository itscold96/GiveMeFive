'use client';
import React from 'react';
import SideMenu from '../../components/mypage/SideMenu';
import styles from '../mypage.module.scss';
import Footer from '../../components/footer/Footer';

const ReservationHistory: React.FC = () => {
  return (
    <div className={styles['reservationhistory']}>
      <div className={styles['side-menu-container']}>
        <SideMenu />
      </div>
      <Footer />
    </div>
  );
};

export default ReservationHistory;
