import S from './ActivityInfo.module.scss';
import star from '@/images/star-icon.svg';
import location from '@/images/location.svg';
import Image from 'next/image';
import { getActivityId } from '@/fetches/activities';

export default async function ActivityInfo({ params }: { params: { id: string } }) {
  const activity = await getActivityId({ id: Number(params.id) });

  return (
    <>
      <div className={S.activityInfoAndDropdown}>
        <div className={S.activityInfo}>
          <div className={S.category}>{activity.category}</div>
          <div className={S.title}>{activity.title}</div>

          <div className={S.ratingAndAddressContainer}>
            <div className={S.ratingContainer}>
              <Image src={star} alt="" width={16} height={16} />

              <div className={S.rating}>
                {activity.rating} ({activity.reviewCount})
              </div>
            </div>

            <div className={S.locationContainer}>
              <Image src={location} alt="" width={18} height={18} />
              <div className={S.address}>{activity.address}</div>
            </div>
          </div>
        </div>
        <div>드롭다운</div>
      </div>
      <div className={S.imageContainer}>
        <Image src={activity.bannerImageUrl} alt="" width={384} height={384} />
      </div>

      <hr className={S.hr} />

      <div className={S.introductionContainer}>
        <span className={S.activityDescription}>체험 설명</span>
        <div className={S.description}>{activity.description}</div>
      </div>
      <hr className={S.hr} />

      <div className={S.mapContainer}>
        <div className={S.map}>지도</div>

        <div className={S.locationContainer}>
          <Image src={location} alt="" width={18} height={18} />
          <div className={S.address}>{activity.address}</div>
        </div>
      </div>
      <hr className={S.hr} />
    </>
  );
}
