import React from 'react';
import SideMenu from '../../components/mypage/SideMenu';
import styles from '../mypage.module.scss';

const MyExperiencemanagement: React.FC = () => {
  return (
    <div className={styles['myexperiencemanagemen']}>
      <div className={styles['side-menu-container']}>
        <SideMenu />
      </div>
    </div>
  );
};

export default MyExperiencemanagement;
