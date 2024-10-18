import S from './Banner.module.scss';
import Image from 'next/image';
import { useActivityStore } from '@/stores/useActivityStore';

export default function Banner() {
  const { activities } = useActivityStore();

  return (
    <div className={S.bannerContainer}>
      {activities.map(activity => (
        <div key={activity.id} className={S.bannerImageWrapper}>
          <div className={S.bannerImageContainer}>
            <Image
              src={activity.bannerImageUrl}
              alt={activity.title}
              className={S.bannerImage}
              width={0}
              height={550}
              objectFit="cover"
              style={{ zIndex: -1 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
