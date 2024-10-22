'use client';

import S from './AllZoneCard.module.scss';
import Image from 'next/image';
import Star from '@/images/star-icon.svg';
// import React from 'react';
import { useActivityStore } from '@/stores/useActivityStore';
import CategoryAndDropdown, { Category as CategoryType } from './category/CategoryAndDropdown';
import { useState, useEffect, useMemo } from 'react';
import Pagination from './pagination/Pagination';

export default function AllZoneCard() {
  const activitiesResponse = useActivityStore(state => state.activitiesResponse);
  const getActivities = useActivityStore(state => state.getActivities);
  const [selectedSort, setSelectedSort] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };
  const activityTotalCount = useActivityStore(state => state.activitiesResponse.totalCount);
  const pageCount = useMemo(() => Math.max(1, Math.ceil(activityTotalCount / 8)), [activityTotalCount]);
  const [page, setPage] = useState(1);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    getActivities({
      category: selectedCategory ?? undefined,
      sort: selectedSort as 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest',
      size: 8,
      method: 'offset',
      page,
    });
  }, [selectedCategory, selectedSort, page]);

  if (!activitiesResponse.activities || activitiesResponse.activities.length === 0) {
    return <p>표시할 활동이 없습니다.</p>;
  }

  return (
    <div>
      <CategoryAndDropdown
        selectedCategory={selectedCategory as CategoryType}
        setSelectedCategory={setSelectedCategory}
        selectedSort={selectedSort as string}
        handleSortChange={handleSortChange}
      />

      <div className={S.allExperienceContainer}>
        <span className={S.experienceText}>🛼 모든체험</span>
      </div>

      <div className={S.allZoneCardContainer}>
        {activitiesResponse.activities.map(activity => (
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
      <Pagination onChangePage={onChangePage} pageCount={pageCount} defaultValue={1} />
    </div>
  );
}
