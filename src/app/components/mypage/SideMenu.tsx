'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [profileImageUrl, setProfileImageUrl] = useState(DefaultProfileImage);
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (userInfo?.profileImageUrl) {
      setProfileImageUrl(userInfo.profileImageUrl);
    }
  }, [userInfo]);

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
      } catch (error) {
        console.error('Failed to upload profile image:', error);
      }
    }
  };

  const menuItems = [
    { path: '/mypage/myprofile', icon: MyProfileIcon, label: '내 정보' },
    { path: '/mypage/reservationhistory', icon: ReservationHistoryIcon, label: '예약 내역' },
    { path: '/mypage/myexperiencemanagement', icon: MyExperienceManagementIcon, label: '내 체험 관리' },
    { path: '/mybookingstatus', icon: ReservationStatusIcon, label: '예약 현황' },
  ];

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
          {menuItems.map(({ path, icon, label }) => (
            <li key={path} className={pathname === path ? S.active : ''}>
              <Link href={path}>
                <Image src={icon} alt={label} className={S.menuIcon} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
