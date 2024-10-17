'use client';

import S from './BestZoneCard.module.scss';
import CommonCard from '../CommonCard';
import Image from 'next/image';
import Star from '@/images/star-icon.svg';
import { Activity } from '@/api/activities';

interface BestZoneCardProps {
  activities: Activity[];
}

export default function BestZoneCard({ activities }: BestZoneCardProps) {
  return (
    <>
      {activities.map(activity => (
        <CommonCard key={activity.id}>
          <div className={S.bestZoneCard}>
            <Image src={activity.bannerImageUrl} alt={activity.title} />
            <div className={S.bestZoneCardRating}>
              <Image src={Star} alt="like" />
              <span>{activity.rating}</span>
              <span>{activity.title}</span>
              <span>{activity.price}</span>
            </div>
          </div>
        </CommonCard>
      ))}
    </>
  );
}
