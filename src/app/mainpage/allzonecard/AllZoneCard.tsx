'use client';

import S from './AllZoneCard.module.scss';
import Image from 'next/image';
import Star from '@/images/star-icon.svg';
import CategoryAndDropdown, { Category as CategoryType } from './category/CategoryAndDropdown';
import { useState, useEffect, useMemo } from 'react';
import Pagination from './pagination/Pagination';
import { useActivitiesQuery, useSearchActivitiesQuery } from '@/queries/useActivityQuery';
import NoActivity from '@/images/empty.svg';
import { useRouter } from 'next/navigation';
interface AllZoneCardProps {
  searchTerm: string;
}

export default function AllZoneCard({ searchTerm }: AllZoneCardProps) {
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [page, setPage] = useState(1);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const isSearchMode = !!searchTerm;

  const itemsPerPage = isSearchMode ? 16 : 8;

  const { data: normalActivitiesData } = useActivitiesQuery({
    category: selectedCategory ?? undefined,
    sort: selectedSort as 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest',
    size: itemsPerPage,
    method: 'offset',
    page,
  });

  const { data: searchActivitiesData } = useSearchActivitiesQuery(searchTerm, page, itemsPerPage);

  const activitiesData = isSearchMode ? searchActivitiesData : normalActivitiesData;

  const filteredActivities = useMemo(() => {
    if (!activitiesData?.activities) return [];
    return isSearchMode
      ? activitiesData.activities.filter(activity => activity.title.toLowerCase().includes(searchTerm.toLowerCase()))
      : activitiesData.activities;
  }, [isSearchMode, searchTerm, activitiesData]);

  const totalItems = useMemo(() => {
    return isSearchMode ? filteredActivities.length : activitiesData?.totalCount || 0;
  }, [isSearchMode, filteredActivities, activitiesData]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory, selectedSort]);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setPage(1);
  };

  const handleCategoryChange = (category: CategoryType | null) => {
    setSelectedCategory(category);
    setPage(1); // 카테고리 변경 시 페이지를 1로 리셋
  };

  return (
    <div>
      {!isSearchMode && (
        <>
          <CategoryAndDropdown
            selectedCategory={selectedCategory as CategoryType}
            setSelectedCategory={handleCategoryChange}
            selectedSort={selectedSort as string}
            handleSortChange={handleSortChange}
          />

          <div className={S.allExperienceContainer}>
            <span className={S.experienceText}>🛼 모든체험</span>
          </div>
        </>
      )}

      {isSearchMode && (
        <div className={S.searchResultContainer}>
          <span className={S.searchResultText}>
            <span className={S.searchTerm}>{searchTerm}</span>
            (으)로 검색한 결과입니다.
          </span>
          <span className={S.searchResultCount}>총 {totalItems}개의 결과</span>
        </div>
      )}

      {!filteredActivities || filteredActivities.length === 0 ? (
        <div className={S.noActivityContainer}>
          <Image src={NoActivity} alt="no activity" width={283} height={283} />
          <p className={S.noActivityText}>
            {isSearchMode ? '검색 결과가 없습니다.' : '해당 카테고리 활동이 없습니다.'}
          </p>
        </div>
      ) : (
        <div className={S.allZoneCardContainer}>
          {filteredActivities.map(activity => (
            <div key={activity.id} onClick={() => router.push(`/activity/${activity.id}`)}>
              <div className={S.allZoneCardImage}>
                {!imgError[activity.id] && (
                  <Image
                    src={activity.bannerImageUrl}
                    alt=""
                    width={283}
                    height={283}
                    className={S.allZoneCardImage}
                    onError={() => setImgError(prev => ({ ...prev, [activity.id]: true }))}
                  />
                )}
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
      {totalItems > 0 && (
        <div className={S.paginationContainer}>
          <Pagination onChangePage={setPage} totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={page} />
        </div>
      )}
    </div>
  );
}
