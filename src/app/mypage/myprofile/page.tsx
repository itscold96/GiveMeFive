'use client';
import React, { useState } from 'react';
import UserInfoForm from '../../components/mypage/UserInfoForm';
import SideMenu from '../../components/mypage/SideMenu';
import AlertModal from '../../components/modal/AlertModal';
import ConfirmModal from '../../components/modal/ConfirmModal';
import styles from '../mypage.module.scss';
import Footer from '../../components/footer/Footer';

const Myprofile: React.FC = () => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openAlertModal = () => {
    setIsAlertModalOpen(true);
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleAlert = () => {
    console.log('Alerted');
    //로직 추가
  };

  const handleConfirm = () => {
    console.log('Confirmed');
    //로직 추가
  };

  return (
    <div className={styles['myprofile']}>
      <div className={styles['side-menu-container']}>
        <SideMenu />
      </div>
      <div className={styles['form-container']}>
        <UserInfoForm />
        <button onClick={openAlertModal}>Open Alert Modal</button>
        <button onClick={openConfirmModal} style={{ marginLeft: '10px' }}>
          Open Confirm Modal
        </button>
      </div>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onAlert={handleAlert}
        message="예약을 취소하시겠습니까?"
        alertButtonText="취소하기"
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        message="가입이 완료되었습니다!"
        confirmButtonText="확인"
      />
      <Footer />
    </div>
  );
};

export default Myprofile;
