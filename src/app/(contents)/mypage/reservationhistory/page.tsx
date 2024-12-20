'use client';
import React from 'react';
import SideMenu from '../../../components/mypage/SideMenu';
import S from './reservationhistory.module.scss';
import ReservationHistoryCardList from '../../../components/mypage/ReservationHistoryCardList';

function ReservationHistory() {
  return (
    <div className={S.myExperienceManagement}>
      <div className={S.container}>
        <div className={S.sideMenuContainer}>
          <SideMenu />
        </div>
        <div className={S.contentContainer}>
          <ReservationHistoryCardList />
        </div>
      </div>
    </div>
  );
}

export default ReservationHistory;
