import S from './ActivityReviews.module.scss';
import star from '@/images/star-icon.svg';
import Image from 'next/image';

export default function ActivityReviews() {
  return (
    <div className={S.activityReviewAndPagination}>
      <span className={S.activityReview}>후기</span>

      <div className={S.averageRatingAndSatisfaction}>
        <div className={S.averageRating}>4.5</div>

        <div className={S.satisfaction}>
          <span className={S.satisfactionTitle}>만족도</span>
          <div className={S.reviewCountContainer}>
            <Image src={star} alt="" width={16} height={16} />
            <div className={S.reviewCount}>(수량)개 후기</div>
          </div>
        </div>
      </div>

      <div className={S.reviewContainer}>
        <div className={S.profileImage}>프사</div>
        <div>
          <div className={S.reviewInfo}>
            <span className={S.reviewer}>작성자</span>
            <div className={S.dash}>|</div>
            <div className={S.reviewDate}>작성 날짜</div>
          </div>
          <div className={S.reviewContent}>리뷰내용</div>
        </div>
      </div>
      <hr className={S.hr2} />

      <div>페이지네이션</div>
    </div>
  );
}
