'use client';

import S from './ActivityReviews.module.scss';
import star from '@/images/star-icon.svg';
import Image from 'next/image';
import ReviewPagination from './pagination/Pagination';
import noReview from '@/images/empty.svg';
import { useActivityReviewsQuery, useDetailActivitiesQuery } from '@/queries/useActivityInfoQuery';

export default function ActivityReviews({ params }: { params: { id: string } }) {
  const activityId = Number(params.id);
  const activityQuery = useDetailActivitiesQuery(activityId);
  const reviewsQuery = useActivityReviewsQuery(activityId);

  if (!reviewsQuery.data?.reviews || reviewsQuery.data?.reviews.length === 0) {
    return (
      <div className={S.activityReviewAndPagination}>
        <div className={S.noReviewContainer}>
          <Image src={noReview} alt="" width={100} height={100} />
          <div>작성된 후기가 없습니다.</div>
        </div>
      </div>
    );
  }

  const activity = activityQuery.data;
  const reviews = reviewsQuery.data;

  return (
    <>
      <div className={S.activityReviewAndPagination}>
        <span className={S.activityReview}>후기</span>

        <div className={S.averageRatingAndSatisfaction}>
          <div className={S.averageRating}>{activity?.rating}</div>

          <div className={S.satisfaction}>
            <span className={S.satisfactionTitle}>만족도</span>
            <div className={S.reviewCountContainer}>
              <Image src={star} alt="" width={16} height={16} />
              <div className={S.reviewCount}>({activity?.reviewCount})개 후기</div>
            </div>
          </div>
        </div>

        <div className={S.reviewContainer}>
          <div className={S.profileImage}>
            <Image src={reviews?.reviews[0]?.user.profileImageUrl} alt="" width={45} height={45} />
          </div>
          <div>
            <div className={S.reviewInfo}>
              <span className={S.reviewer}>{reviews?.reviews[0]?.user.nickname}</span>
              <div className={S.dash}>|</div>
              <div className={S.reviewDate}>{reviews?.reviews[0]?.createdAt.toLocaleDateString()}</div>
            </div>
            <div className={S.reviewContent}>{reviews?.reviews[0]?.content}</div>
          </div>
        </div>
        <hr className={S.hr2} />
      </div>

      <div className={S.reviewPagination}>
        <ReviewPagination
          totalItems={reviews?.totalCount}
          itemsPerPage={reviews?.reviews.length}
          currentPage={1}
          onChangePage={page => {
            console.log(page);
          }}
        />
      </div>
    </>
  );
}
