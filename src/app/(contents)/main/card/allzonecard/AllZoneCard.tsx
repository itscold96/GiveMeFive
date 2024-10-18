'use client';

import S from './AllZoneCard.module.scss';
import Image from 'next/image';
import Star from '@/images/star-icon.svg';
import React from 'react';
import { useActivityStore } from '@/stores/useActivityStore';
import { Activity } from '@/api/activities';

interface AllZoneCardProps {
  activities: Activity[];
}

export default function AllZoneCard({ activities: propActivities }: AllZoneCardProps) {
  const { activities: storeActivities } = useActivityStore();
  const displayActivities = propActivities.length > 0 ? propActivities : storeActivities;

  console.log('AllZoneCard 렌더링:', { activities: storeActivities });

  if (!displayActivities || displayActivities.length === 0) {
    return <p>표시할 활동이 없습니다.</p>;
  }

  console.log(displayActivities);

  return (
    <div className={S.allZoneCardContainer}>
      {displayActivities.map(activity => (
        <div key={activity.id}>
          <div className={S.allZoneCardImage}>
            <Image
              src={activity.bannerImageUrl}
              alt={activity.title}
              style={{
                borderRadius: '20px',
              }}
              width={283}
              height={283}
              className={S.allZoneCardImage}
              onError={e => {
                console.error('이미지 로드 에러:', e);
                console.log('에러가 발생한 이미지 URL:', activity.bannerImageUrl);
              }}
            />
          </div>
          <div className={S.allZoneCardContent}>
            <div className={S.allZoneCardRating}>
              <Image src={Star} alt="like" />
              <span className={S.allZoneCardRatingText}>{activity.rating}</span>
              <span className={S.allZoneCardReviewCount}>({activity.reviewCount})</span>
            </div>

            <div className={S.allZoneCardTitle}>{activity.title}</div>
            <div className={S.allZoneCardPrice}>
              ₩ {Number(activity.price).toLocaleString()} <span className={S.allZoneCardPriceUnit}> / 인</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
