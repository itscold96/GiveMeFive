import React, { useState } from 'react';
import MyExperienceManagementCard from './MyExperienceManagementCard';
import S from './MyExperienceManagementList.module.scss';
import { useMyActivitiesQuery } from '@/queries/useMyActivitiesQuery';
import emptyImage from '@/images/empty.svg';
import Image from 'next/image';

function MyExperienceManagementList() {
  const [page] = useState(1);
  const { data, error, isLoading } = useMyActivitiesQuery({ page, size: 20 });

  if (isLoading) {
    return <p>로딩 중입니다...</p>;
  }

  if (error) {
    return <p>데이터를 가져오는 중 오류가 발생했습니다: {error.message}</p>;
  }

  if (!data || !data.activities || data.activities.length === 0) {
    return (
      <div className={S.emptyState}>
        <div className={S.imageContainer}>
          <Image src={emptyImage} alt="빈 상태 이미지" width={240} height={240} />
        </div>
        <p className={S.text}>아직 등록한 체험이 없어요</p>
      </div>
    );
  }

  return (
    <div className={S.list}>
      {data.activities.map(activity => (
        <MyExperienceManagementCard key={activity.id} experience={activity} />
      ))}
    </div>
  );
}

export default MyExperienceManagementList;
