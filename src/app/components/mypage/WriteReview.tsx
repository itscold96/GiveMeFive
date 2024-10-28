import React, { useState } from 'react';
import S from './WriteReview.module.scss';
import ReactStars from 'react-stars';
import Image from 'next/image';
import Button from '../@shared/button/Button';
import { postReview } from '@/fetches/activitiesReviews';

interface WriteReviewProps {
  teamId: string;
  reservationId: string;
  bannerImageUrl: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  totalPrice: number;
  onClose: () => void;
  onReviewSubmitted: () => void;
}

const WriteReview: React.FC<WriteReviewProps> = ({
  reservationId,
  bannerImageUrl,
  title,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
  onClose,
  onReviewSubmitted,
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSubmitDisabled = rating === 0 || reviewText.trim() === '' || reviewText.length > 300;

  async function handleSubmit() {
    if (isSubmitDisabled) {
      return;
    }

    try {
      setIsSubmitting(true);
      await postReview(reservationId, reviewText, rating);
      onClose();
      onReviewSubmitted();
    } catch (error) {
      /* empty */
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={S.modalContent}>
      <h2>후기 작성</h2>
      <div className={S.experienceInfo}>
        <div className={S.imageContainer}>
          <Image src={bannerImageUrl} alt="Banner Image" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={S.textInfo}>
          <p className={S.title}>{title}</p>
          <p className={S.details}>
            {date} · {startTime} - {endTime} · {headCount}명
          </p>
          <p className={S.price}>₩{totalPrice.toLocaleString()}</p>
        </div>
      </div>

      <div className={S.ratingContainer}>
        <ReactStars
          count={5}
          value={rating}
          onChange={(newRating: React.SetStateAction<number>) => setRating(newRating)}
          size={56}
          half={true}
          color1="#eee"
          color2="#FFC23D"
        />
      </div>

      <textarea
        value={reviewText}
        onChange={e => {
          if (e.target.value.length <= 300) {
            setReviewText(e.target.value);
          }
        }}
        placeholder="후기를 작성해주세요 (최대 300자)"
        rows={4}
        className={S.reviewTextarea}
      />

      <Button
        buttonColor={isSubmitDisabled ? 'gray' : 'nomadBlack'}
        textSize="lg"
        borderRadius="radius6"
        padding="padding14"
        className={S.submitButton}
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitDisabled || isSubmitting}
      >
        작성하기
      </Button>
    </div>
  );
};

export default WriteReview;
