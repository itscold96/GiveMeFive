'use client';
import React from 'react';
import Link from 'next/link';
import SideMenu from '../../../components/mypage/SideMenu';
import MyExperienceManagementList from '../../../components/mypage/MyExperienceManagementList';
import S from './myexperienceManagement.module.scss';
import Button from '../../../components/@shared/button/Button';
import { Title } from '@mantine/core';

export default function MyExperienceManagement() {
  return (
    <div className={S.myExperienceManagement}>
      <div className={S.container}>
        <div className={S.sideMenuContainer}>
          <SideMenu />
        </div>
        <div className={S.contentContainer}>
          <div className={S.header}>
            <Title order={2} className={S.title}>
              내 체험 관리
            </Title>
            <Link href="/mypage/myexperiencemanagement/addactivities" passHref>
              <Button
                buttonColor="giveMeNavy"
                textSize="lg"
                borderRadius="radius6"
                padding="padding14"
                className={S.submitButton}
                type="button"
              >
                체험 등록하기
              </Button>
            </Link>
          </div>
          <MyExperienceManagementList />
        </div>
      </div>
    </div>
  );
}
