'use client';

import S from './AllZoneCard.module.scss';
import Image from 'next/image';
import Star from '@/images/star-icon.svg';
import CategoryAndDropdown, { Category as CategoryType } from './category/CategoryAndDropdown';
import { useState, useEffect, useMemo } from 'react';
import Pagination from './pagination/Pagination';
import { useActivitiesQuery } from '@/queries/useActivityQuery';
import { useActivitiesQuery } from '@/queries/useActivityQuery';
import NoActivity from '@/images/empty.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { GetActivitiesResponse } from '@/fetches/activities';
import { getCurrencyFormat } from '@/utils/getCurrencyFormat';

export default function AllZoneCard({ initialActivitiesData }: { initialActivitiesData: GetActivitiesResponse }) {
export default function AllZoneCard({ initialActivitiesData }: { initialActivitiesData: GetActivitiesResponse }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSort, setSelectedSort] = useState<string | undefined>(searchParams.get('sort') || undefined);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    (searchParams.get('category') as CategoryType) || null,
  );
  const [page, setPage] = useState(() => {
    const page = searchParams.get('page');
    try {
      return page ? parseInt(page, 10) : 1;
    } catch (error) {
      return 1;
    }
  });
  const searchParams = useSearchParams();

  const [selectedSort, setSelectedSort] = useState<string | undefined>(searchParams.get('sort') || undefined);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    (searchParams.get('category') as CategoryType) || null,
  );
  const [page, setPage] = useState(() => {
    const page = searchParams.get('page');
    try {
      return page ? parseInt(page, 10) : 1;
    } catch (error) {
      return 1;
    }
  });
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const title = useMemo(() => searchParams.get('title') || '', [searchParams]);
  const isTitleSearched = useMemo(() => title !== '', [title]);
  const itemsPerPage = useMemo(() => (isTitleSearched ? 16 : 8), [isTitleSearched]);
  const title = useMemo(() => searchParams.get('title') || '', [searchParams]);
  const isTitleSearched = useMemo(() => title !== '', [title]);
  const itemsPerPage = useMemo(() => (isTitleSearched ? 16 : 8), [isTitleSearched]);

  const { data: activitiesData, isFetched } = useActivitiesQuery(
    {
      category: selectedCategory ?? undefined,
      sort: selectedSort as 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest',
      size: itemsPerPage,
      method: 'offset',
      title: title,
      keyword: title, // 키워드 검색도 같이
      page,
    },
    initialActivitiesData,
  );

  const totalItems = useMemo(() => activitiesData?.totalCount || 0, [activitiesData]);

  useEffect(() => {
    setPage(1);
  }, [title, selectedCategory, selectedSort]);
  }, [title, selectedCategory, selectedSort]);

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
      {!isTitleSearched && (
      {!isTitleSearched && (
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

      {isTitleSearched && (
      {isTitleSearched && (
        <div className={S.searchResultContainer}>
          <span className={S.searchResultText}>
            <span className={S.searchTerm}>{title}</span>
            <span className={S.searchTerm}>{title}</span>
            (으)로 검색한 결과입니다.
          </span>
          <span className={S.searchResultCount}>총 {totalItems}개의 결과</span>
        </div>
      )}

      {isFetched && (!activitiesData || activitiesData.activities.length === 0) ? (
        <div className={S.noActivityContainer}>
          <Image src={NoActivity} alt="no activity" width={283} height={283} />
          <p className={S.noActivityText}>
            {isTitleSearched ? '검색 결과가 없습니다.' : '해당 카테고리 활동이 없습니다.'}
            {isTitleSearched ? '검색 결과가 없습니다.' : '해당 카테고리 활동이 없습니다.'}
          </p>
        </div>
      ) : (
        <div className={S.allZoneCardContainer}>
          {activitiesData?.activities.map(activity => (
            <div key={activity.id} onClick={() => router.push(`/activities/${activity.id}`)} className={S.allZoneCard}>
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
                  ₩ {getCurrencyFormat(activity.price)}
                  <span className={S.allZoneCardPriceUnit}> / 인</span>
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
