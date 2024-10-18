'use client';

import S from './BestZoneCard.module.scss';
import Image from 'next/image';
import Star from '@/images/star-icon.svg';
import React from 'react';
import { useActivityStore } from '@/stores/useActivityStore';
import { Activity } from '@/api/activities';
interface BestZoneCardProps {
  activities: Activity[];
}

export default function BestZoneCard({ activities: propActivities }: BestZoneCardProps) {
  const { activities } = useActivityStore();
  console.log('BestZoneCard 렌더링:', { activities });

  if (!propActivities || propActivities.length === 0) {
    return <p>표시할 활동이 없습니다.</p>;
  }

  const sortedActivities = [...activities].sort((a, b) => b.reviewCount - a.reviewCount);

  return (
    <div className={S.bestZoneCardContainer}>
      {sortedActivities.map(activity => (
        <div key={activity.id} className={S.bestZoneCard}>
          <div className={S.bestZoneCardImage}>
            <Image
              src={activity.bannerImageUrl}
              alt={activity.title}
              width={384}
              height={384}
              className={S.bestZoneCardImage}
              onError={e => {
                console.error('이미지 로드 에러:', e);
                console.log('에러가 발생한 이미지 URL:', activity.bannerImageUrl);
              }}
            />

            <div className={S.bestZoneCardContent}>
              <div className={S.bestZoneCardRating}>
                <Image src={Star} alt="like" />
                <span className={S.bestZoneCardRatingText}>
                  {activity.rating} ({activity.reviewCount})
                </span>
              </div>

              <div className={S.bestZoneCardTitle}>{activity.title}</div>
              <div className={S.bestZoneCardPrice}>
                ₩ {Number(activity.price).toLocaleString()}
                <span className={S.bestZoneCardPriceUnit}> / 인</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
