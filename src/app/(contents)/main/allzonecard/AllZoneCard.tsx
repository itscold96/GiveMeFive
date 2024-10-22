'use client';

import S from './AllZoneCard.module.scss';
import Image from 'next/image';
import Star from '@/images/star-icon.svg';
import CategoryAndDropdown, { Category as CategoryType } from './category/CategoryAndDropdown';
import { useState } from 'react';
import Pagination from './pagination/Pagination';
import { useActivitiesQuery } from '@/queries/useActivityQuery';
import NoActivity from '@/images/empty.svg';

export default function AllZoneCard() {
  const [selectedSort, setSelectedSort] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [page, setPage] = useState(1);

  const {
    data: activitiesData,
    isLoading,
    error,
  } = useActivitiesQuery({
    category: selectedCategory ?? undefined,
    sort: selectedSort as 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest',
    size: 8,
    method: 'offset',
    page,
  });

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setPage(1);
  };

  const handleCategoryChange = (category: CategoryType) => {
    setSelectedCategory(category);
    setPage(1); // 카테고리 변경 시 페이지를 1로 리셋
  };

  const totalCount = activitiesData?.totalCount ?? 0;

  return (
    <div>
      <CategoryAndDropdown
        selectedCategory={selectedCategory as CategoryType}
        setSelectedCategory={handleCategoryChange}
        selectedSort={selectedSort as string}
        handleSortChange={handleSortChange}
      />

      <div className={S.allExperienceContainer}>
        <span className={S.experienceText}>🛼 모든체험</span>
      </div>

      {isLoading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div>에러가 발생했습니다: {error.message}</div>
      ) : !activitiesData?.activities || activitiesData.activities.length === 0 ? (
        <div className={S.noActivityContainer}>
          <Image src={NoActivity} alt="no activity" width={283} height={283} />
          <p className={S.noActivityText}>해당 카테고리 활동이 없습니다.</p>
        </div>
      ) : (
        <div className={S.allZoneCardContainer}>
          {activitiesData.activities.map(activity => (
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
      )}
      {totalCount > 0 && (
        <div className={S.paginationContainer}>
          <Pagination onChangePage={setPage} totalItems={totalCount} itemsPerPage={8} currentPage={page} />
        </div>
      )}
    </div>
  );
}
