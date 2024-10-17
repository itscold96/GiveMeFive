'use client';
import React from 'react';
import UserInfoForm from '../../components/mypage/UserInfoForm';
import SideMenu from '../../components/mypage/SideMenu';
<<<<<<< HEAD
import Footer from '../../components/footer/Footer';
import S from './myprofile.module.scss';
=======
import AlertModal from '../../components/@shared/modal/AlertModal';
import ConfirmModal from '../../components/@shared/modal/ConfirmModal';
import styles from '../mypage.module.scss';

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
>>>>>>> 6d4568d3c47b868b8a6f021098adbe31a2272613

function Myprofile() {
  return (
    <div className={S.myprofile}>
      <div className={S.container}>
        <div className={S.sideMenuContainer}>
          <SideMenu />
        </div>
        <div className={S.formContainer}>
          <UserInfoForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Myprofile;
