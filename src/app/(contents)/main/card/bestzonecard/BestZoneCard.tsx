'use client';

import S from './BestZoneCard.module.scss';
import CommonCard from '../CommonCard';
import Image from 'next/image';
import Star from '@/images/star-icon.svg';
import React from 'react';
import { useActivityStore } from '@/stores/useActivityStore';

export default function BestZoneCard() {
  const { activities } = useActivityStore();
  console.log('BestZoneCard 렌더링:', { activities });

  if (!activities || activities.length === 0) {
    return <p>표시할 활동이 없습니다.</p>;
  }

  return (
    <div>
      {activities.map(activity => (
        <CommonCard key={activity.id}>
          <div className={S.bestZoneCard}>
            <Image src={activity.bannerImageUrl} alt={activity.title} layout="fill" objectFit="cover" />
            <div className={S.bestZoneCardRating}>
              <Image src={Star} alt="like" />
              <span>
                {activity.rating} ({activity.reviewCount})
              </span>
              <div>{activity.title} </div>
              <div>{activity.price}</div>
            </div>
          </div>
        </CommonCard>
      ))}
    </div>
  );
}
