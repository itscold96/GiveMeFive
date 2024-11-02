'use client';
import MyReservations from '../../components/myReservations/Reservations/Reservations';
import React from 'react';
import SideMenu from '../../components/mypage/SideMenu';
import S from './myreservations.module.scss';

function myreservations() {
  return (
    <div className={S.myprofile}>
      <div className={S.container}>
        <div className={S.sideMenuContainer}>
          <SideMenu />
        </div>
        <div className={S.formContainer}>
          <MyReservations />
        </div>
      </div>
    </div>
  );
}

export default myreservations;
