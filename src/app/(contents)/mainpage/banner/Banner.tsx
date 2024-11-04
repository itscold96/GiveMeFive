'use client';

import S from './Banner.module.scss';
import Image from 'next/image';
import { Activity } from '@/fetches/activities';
import { useState } from 'react';

interface BannerProps {
  bestActivity: Activity | null;
}

export default function Banner({ bestActivity }: BannerProps) {
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  if (!bestActivity) {
    return null;
  }

  return (
    <div className={S.bannerContainer}>
      <div className={S.bannerImageWrapper}>
        {!imgError[bestActivity.id] && (
          <Image
            src={bestActivity.bannerImageUrl}
            alt=""
            className={S.bannerImage}
            quality={100}
            fill
            sizes="100vw"
            objectFit="cover"
            onError={() => setImgError(prev => ({ ...prev, [bestActivity.id]: true }))}
          />
        )}
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
