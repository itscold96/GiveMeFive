'use client';

import S from './BestZoneCard.module.scss';
import Image from 'next/image';
import Star from '@/images/star-icon.svg';
import { useState } from 'react';
import ArrowButton from './arrowButton/ArrowButton';
import { useBestActivitiesQuery } from '@/queries/useActivityQuery';

export default function BestZoneCard() {
  const [page, setPage] = useState(1);
  const { data: bestActivitiesData } = useBestActivitiesQuery(page);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  if (!bestActivitiesData?.activities || bestActivitiesData.activities.length === 0) {
    return <p>표시할 활동이 없습니다.</p>;
  }

  return (
    <div>
      <div className={S.bestExperienceContainer}>
        <span className={S.experienceText}>🔥 인기체험</span>
        <div className={S.experienceArrowContainer}>
          <ArrowButton page={page} setPage={setPage} totalCount={bestActivitiesData.totalCount} />
        </div>
      </div>

      <div className={S.bestZoneCardContainer}>
        {bestActivitiesData.activities.map(activity => (
          <div key={activity.id} className={S.bestZoneCard}>
            <div className={S.bestZoneCardImage}>
              {!imgError[activity.id] && (
                <Image
                  src={activity.bannerImageUrl}
                  alt=""
                  width={384}
                  height={384}
                  className={S.bestZoneCardImage}
                  onError={() => setImgError(prev => ({ ...prev, [activity.id]: true }))}
                />
              )}

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
