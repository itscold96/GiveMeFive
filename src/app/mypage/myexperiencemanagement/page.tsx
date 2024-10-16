import React from 'react';
import SideMenu from '../../components/mypage/SideMenu';
import Footer from '../../components/footer/Footer';
import S from '../mypage.module.scss';

const MyExperiencemanagement: React.FC = () => {
  return (
    <div className={S['myexperiencemanagement']}>
      <div className={S['sideMenuContainer']}>
        <SideMenu />
      </div>
    </div>
  );
};

export default MyExperiencemanagement;
