import S from './Banner.module.scss';
import Image from 'next/image';
import { useActivityStore } from '@/stores/useActivityStore';

export default function Banner() {
  const { activities } = useActivityStore();

  // 리뷰 수가 가장 많은 활동 찾기
  const bestActivity = activities.length > 0 ? [...activities].sort((a, b) => b.reviewCount - a.reviewCount)[0] : null;

  if (!bestActivity) {
    return null; // 활동이 없는 경우 아무것도 렌더링하지 않음
  }
  return (
    <div className={S.bannerContainer}>
      <div className={S.bannerImageWrapper}>
        {/* <div className={S.bannerImageContainer}> */}
        <Image
          src={bestActivity.bannerImageUrl}
          alt={bestActivity.title}
          className={S.bannerImage}
          width={0}
          height={550}
          objectFit="cover"
          style={{ zIndex: -1 }}
        />
        {/* </div> */}
        <div className={S.bannerContentWrapper}>
          <div className={S.bannerContent}>
            <p className={S.bannerTitle}>{bestActivity.title}</p>
            <p className={S.bannerSubtitle}>{`${new Date().getMonth() + 1}월의 인기 체험 BEST 🔥`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
