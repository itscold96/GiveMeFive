'use client';

import S from './ActivityReviews.module.scss';
import star from '@/images/star-icon.svg';
import Image from 'next/image';
import ReviewPagination from './pagination/Pagination';
import noReview from '@/images/empty.svg';
import { useActivityReviewsQuery, useDetailActivitiesQuery } from '@/queries/useActivityInfoQuery';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';

export default function ActivityReviews({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(1);

  const activityId = Number(params.id);
  const activityQuery = useDetailActivitiesQuery(activityId);
  const reviewsQuery = useActivityReviewsQuery(activityId);
  const user = useUserStore(state => state.user);
  const isCreator = user && user.id === activityQuery.data?.userId;

  const activity = activityQuery.data;
  const reviews = reviewsQuery.data;

  if (!reviewsQuery.data?.reviews || reviewsQuery.data?.reviews.length === 0) {
    return (
      <div className={`${S.activityReviewAndPagination} ${isCreator ? S.fullWidth : ''}`}>
        <div className={S.noReviewContainer}>
          <Image src={noReview} alt="" width={100} height={100} />
          <div>작성된 후기가 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={S.activityReviewAndPagination}>
        <span className={S.activityReview}>후기</span>

        <div className={S.averageRatingAndSatisfaction}>
          <div className={S.averageRating}>{activity?.rating || 0}</div>

          <div className={S.satisfaction}>
            <span className={S.satisfactionTitle}>만족도</span>
            <div className={S.reviewCountContainer}>
              <Image src={star} alt="" width={16} height={16} unoptimized />
              <div className={S.reviewCount}>({activity?.reviewCount || 0})개 후기</div>
            </div>
          </div>
        </div>

        <div className={S.reviewContainer}>
          {reviews?.reviews.map(review => (
            <div key={review.id} className={S.reviewContainer}>
              <div className={S.profileImageContainer}>
                {review.user?.profileImageUrl && (
                  <Image src={review.user.profileImageUrl} alt="" width={45} height={45} className={S.profileImage} />
                )}
              </div>
              <div>
                <div className={S.reviewInfo}>
                  <span className={S.reviewer}>{review.user.nickname}</span>
                  <div className={S.dash}>|</div>
                  <div className={S.reviewDate}>
                    {review.createdAt ? dayjs(review.createdAt).format('YYYY.MM.DD') : ''}
                  </div>
                </div>
                <div className={S.reviewContent}>{review.content}</div>
              </div>
            </div>
          ))}
        </div>
        <hr className={S.hr2} />
      </div>

      <div className={S.reviewPagination}>
        <ReviewPagination
          totalItems={reviews?.totalCount || 0}
          itemsPerPage={reviews?.reviews.length || 0}
          currentPage={currentPage}
          onChangePage={page => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
