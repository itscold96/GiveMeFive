'use client';

import S from './BestZoneCard.module.scss';
import Image from 'next/image';
import Star from '@/images/star-icon.svg';
import React from 'react';
import { useActivityStore } from '@/stores/useActivityStore';
import ArrowButton from '../arrowButton/ArrowButton';

export default function BestZoneCard() {
  const bestActivitiesResponse = useActivityStore(state => state.bestActivitiesResponse);

  if (!bestActivitiesResponse.activities || bestActivitiesResponse.activities.length === 0) {
    return <p>표시할 활동이 없습니다.</p>;
  }

  return (
    <div>
      <div className={S.bestExperienceContainer}>
        <span className={S.experienceText}>🔥 인기체험</span>
        <div className={S.experienceArrowContainer}>
          <ArrowButton />
        </div>
      </div>

      <div className={S.bestZoneCardContainer}>
        {bestActivitiesResponse.activities.map(activity => (
          <div key={activity.id} className={S.bestZoneCard}>
            <div className={S.bestZoneCardImage}>
              <Image
                src={activity.bannerImageUrl}
                alt={activity.title}
                width={384}
                height={384}
                className={S.bestZoneCardImage}
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
    </div>
  );
}
