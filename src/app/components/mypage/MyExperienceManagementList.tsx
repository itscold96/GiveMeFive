import React, { useState } from 'react';
import MyExperienceManagementCard from './MyExperienceManagementCard';
import S from './MyExperienceManagementList.module.scss';
import { useMyActivitiesQuery } from '@/queries/useMyActivitiesQuery';

function MyExperienceManagementList() {
  const [page] = useState(1);
  const { data, error, isLoading } = useMyActivitiesQuery({ page, size: 20 });

  if (isLoading) {
    return <p>로딩 중입니다...</p>;
  }

  if (error) {
    return <p>데이터를 가져오는 중 오류가 발생했습니다: {error.message}</p>;
  }

  return (
    <div className={S.list}>
      {data?.activities.map(activity => <MyExperienceManagementCard key={activity.id} experience={activity} />)}
    </div>
  );
}

export default MyExperienceManagementList;
