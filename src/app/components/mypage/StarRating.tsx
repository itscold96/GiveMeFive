import React from 'react';
import S from './StarRating.module.scss';
import Image from 'next/image';
import filledStar from '@/images/starrating/filled-star.svg';
import unfilledStar from '@/images/starrating/unfilled-star.svg';
import halfFilledStar from '@/images/starrating/half-filled-star.svg'; // 반쪽 별 이미지 추가

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, maxRating = 5 }) => {
  const handleStarClick = (index: number) => {
    onRatingChange(index + 0.5); // 반개 단위로 설정
  };

  return (
    <div className={S.starRating}>
      {Array.from({ length: maxRating }, (_, index) => {
        const fullIndex = index + 1;
        const isFullFilled = rating >= fullIndex;
        const isHalfFilled = rating >= fullIndex - 0.5 && rating < fullIndex;

        return (
          <div key={index} className={S.starWrapper}>
            <Image
              src={isFullFilled ? filledStar : isHalfFilled ? halfFilledStar : unfilledStar}
              alt={`${fullIndex} star`}
              className={S.star}
              onClick={() => handleStarClick(fullIndex - 0.5)} // 왼쪽 클릭은 반개 단위
            />
            <Image
              src={isFullFilled ? filledStar : isHalfFilled ? halfFilledStar : unfilledStar}
              alt={`${fullIndex} star`}
              className={S.star}
              onClick={() => handleStarClick(fullIndex)} // 오른쪽 클릭은 한개 단위
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
