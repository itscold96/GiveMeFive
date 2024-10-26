'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import S from './SideMenu.module.scss';
import Image from 'next/image';
import MyProfileIcon from '@/images/sidemenuIcon/myprofile-Icon.svg';
import ReservationHistoryIcon from '@/images/sidemenuIcon/reservationhistory-Icon.svg';
import MyExperienceManagementIcon from '@/images/sidemenuIcon/myexperiencemanagement-Icon.svg';
import ReservationStatusIcon from '@/images/sidemenuIcon/reservationstatus-Icon.svg';
import ProfileButtonIcon from '@/images/sidemenuIcon/profile-button-icon.svg';
import DefaultProfileImage from '@/images/profiles/default-profile.svg';
import { useUserQuery } from '@/queries/useUserQuery';
import { postProfileImage } from '@/fetches/postProfileImage';
import { patchUserInfo } from '@/fetches/patchUserInfo';

const SideMenu: React.FC = () => {
  const { data: userInfo } = useUserQuery();
  const [profileImageUrl, setProfileImageUrl] = useState(userInfo?.profileImageUrl || DefaultProfileImage);
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await postProfileImage(file);
        const newProfileImageUrl = response.profileImageUrl;

        setProfileImageUrl(newProfileImageUrl);
        await patchUserInfo({ profileImageUrl: newProfileImageUrl });

        console.log('Updated profile image URL:', newProfileImageUrl);
      } catch (error) {
        console.error('Failed to upload profile image:', error);
      }
    }
  };

  return (
    <aside className={S.sideMenu}>
      <div className={S.profileContainer}>
        <div className={S.profileImageWrapper} onClick={handleProfileImageClick}>
          <Image src={profileImageUrl} alt="Profile" layout="fill" objectFit="cover" className={S.profileImage} />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div className={S.editIcon} onClick={handleProfileImageClick}>
          <Image src={ProfileButtonIcon} alt="Edit Profile" className={S.editButtonIcon} />
        </div>
      </div>
      <nav className={S.menu}>
        <ul>
          <li className={pathname === '/mypage/myprofile' ? S.active : ''}>
            <Link href="/mypage/myprofile">
              <Image src={MyProfileIcon} alt="My Profile" className={S.menuIcon} />내 정보
            </Link>
          </li>
          <li className={pathname === '/mypage/reservationhistory' ? S.active : ''}>
            <Link href="/mypage/reservationhistory">
              <Image src={ReservationHistoryIcon} alt="Reservation History" className={S.menuIcon} />
              예약 내역
            </Link>
          </li>
          <li className={pathname === '/mypage/myexperiencemanagement' ? S.active : ''}>
            <Link href="/mypage/myexperiencemanagement">
              <Image src={MyExperienceManagementIcon} alt="My Experience Management" className={S.menuIcon} />내 체험
              관리
            </Link>
          </li>
          <li className={pathname === '/mybookingstatus' ? S.active : ''}>
            <Link href="/mybookingstatus">
              <Image src={ReservationStatusIcon} alt="Reservation Status" className={S.menuIcon} />
              예약 현황
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
