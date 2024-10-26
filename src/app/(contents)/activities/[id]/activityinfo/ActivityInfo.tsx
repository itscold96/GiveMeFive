'use client';

import S from './ActivityInfo.module.scss';
import star from '@/images/star-icon.svg';
import location from '@/images/location.svg';
import Image from 'next/image';
import Dropdown from '@/app/components/@shared/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import { useDetailActivitiesQuery } from '@/queries/useActivityInfoQuery';
import Map from './map';

export default function ActivityInfo({ params }: { params: { id: string } }) {
  const activityId = Number(params.id);
  const { data: activity } = useDetailActivitiesQuery(activityId);

  const dropdownList = ['수정하기', '삭제하기'];

  const { onDropdownChange, toggleDropdown, isDropdownToggle } = useDropdown(dropdownList);

  return (
    <>
      <div className={S.activityInfoAndDropdown}>
        <div className={S.activityInfo}>
          <div className={S.category}>{activity?.category}</div>
          <div className={S.title}>{activity?.title}</div>

          <div className={S.ratingAndAddressContainer}>
            <div className={S.ratingContainer}>
              <Image src={star} alt="" width={16} height={16} />

              <div className={S.rating}>
                {activity?.rating} ({activity?.reviewCount})
              </div>
            </div>

            <div className={S.locationContainer}>
              <Image src={location} alt="" width={18} height={18} />
              <div className={S.address}>{activity?.address}</div>
            </div>
          </div>
        </div>
        <Dropdown
          type="kebab"
          data={dropdownList}
          onChange={onDropdownChange}
          toggleDropdown={toggleDropdown}
          isDropdownToggle={isDropdownToggle}
        />
      </div>

      <div className={S.imageContainer}>
        <div className={S.mainImageContainer}>
          {activity?.bannerImageUrl && (
            <Image src={activity.bannerImageUrl} alt="메인 이미지" layout="fill" objectFit="cover" />
          )}
        </div>
        {activity?.subImages && activity.subImages.length > 0 && (
          <div className={`${S.subImagesContainer} ${S[`subImageCount${Math.min(activity.subImages.length, 4)}`]}`}>
            {activity.subImages.slice(0, 4).map((subImage, index) => (
              <div key={index} className={S.subImage}>
                {subImage.imageUrl && (
                  <Image src={subImage.imageUrl} alt={`서브 이미지 ${index + 1}`} layout="fill" objectFit="cover" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={S.introductionAndMapContainer}>
        <hr className={S.hr} />
        <div className={S.introductionContainer}>
          <span className={S.activityDescription}>체험 설명</span>
          <div className={S.description}>{activity?.description}</div>
        </div>
        <hr className={S.hr} />
        <div className={S.mapContainer}>
          <div className={S.map}>{activity?.address && <Map address={activity.address} />} </div>

          <div className={S.locationContainer}>
            <Image src={location} alt="" width={18} height={18} />
            <span className={S.address}>{activity?.address}</span>
          </div>
        </div>
        <hr className={S.hr} />
      </div>
    </>
  );
}
