import React, { useState } from 'react';
import S from './WriteReview.module.scss';
import ReactStars from 'react-stars';
import Image from 'next/image';
import Button from '../@shared/button/Button';

interface WriteReviewProps {
  bannerImageUrl: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  totalPrice: number;
  onClose: () => void;
}

const WriteReview: React.FC<WriteReviewProps> = ({
  bannerImageUrl,
  title,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

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
          color1={'#eee'}
          color2={'#FFC23D'}
        />
      </div>

      <textarea
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
        placeholder="후기를 작성해주세요"
        rows={4}
        className={S.reviewTextarea}
      />
      <Button
        buttonColor="nomadBlack"
        textSize="lg"
        borderRadius="radius6"
        padding="padding14"
        className={S.submitButton}
        type="submit"
      >
        작성하기
      </Button>
    </div>
  );
};

export default WriteReview;
