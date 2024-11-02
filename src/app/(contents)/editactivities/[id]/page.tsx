'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SideMenu from '../../../components/mypage/SideMenu';
import S from './editActivities.module.scss';
import AddActivitiesForm from '../../../components/addActivities/addActivitiesForm/AddActivitiesForm';
import { getActivitiesDetail, GetActivitiesDetailResponse } from '@/fetches/getActivitiesDetail';

export default function EditActivities() {
  const [defaultData, setDefaultData] = useState<GetActivitiesDetailResponse>();
  const { id } = useParams();
  const activityId = Number(id);

  const fetchData = async () => {
    try {
      const data = await getActivitiesDetail({ activityId });
      setDefaultData(data);
    } catch (error) {
      console.error('Error fetching activity details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={S.myprofile}>
      <div className={S.container}>
        <div className={S.sideMenuContainer}>
          <SideMenu />
        </div>
        <div className={S.formContainer}>
          <AddActivitiesForm defaultData={defaultData} activityId={activityId} />
        </div>
      </div>
    </div>
  );
}
