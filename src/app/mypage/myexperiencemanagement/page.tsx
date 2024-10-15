import React from 'react';
import SideMenu from '../../components/mypage/SideMenu';
import Footer from '../../components/footer/Footer';
import styles from '../mypage.module.scss';

const MyExperiencemanagement: React.FC = () => {
  return (
    <div className={styles['myexperiencemanagemen']}>
      <div className={styles['side-menu-container']}>
        <SideMenu />
      </div>
      <Footer />
    </div>
  );
};

export default MyExperiencemanagement;
