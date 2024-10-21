'use client';
import React, { useState } from 'react';
import SideMenu from '../../components/mypage/SideMenu';
import S from '../mypage.module.scss';
import Footer from '../../components/@shared/footer/Footer';
import Modal from '../../components/@shared/modal/Modal';
import UserInfoForm from '../../components/mypage/UserInfoForm';

function ReservationHistory() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={S.reservationhistory}>
      <div className={S.sidemenuContainer}>
        <SideMenu />
      </div>
      <button onClick={openModal} className={S.openModalButton}>
        모달 열기
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserInfoForm />
      </Modal>
      <Footer />
    </div>
  );
}

export default ReservationHistory;
