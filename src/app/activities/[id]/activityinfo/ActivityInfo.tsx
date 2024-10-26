'use client';

import S from './ActivityInfo.module.scss';
import star from '@/images/star-icon.svg';
import location from '@/images/location.svg';
import Image from 'next/image';
import Dropdown from '../../../components/@shared/dropdown/Dropdown';
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
        {activity?.bannerImageUrl && <Image src={activity.bannerImageUrl} alt="" width={595} height={534} />}
        <div className={S.subImagesContainer}>
          <div className={S.subImage}>
            {activity?.subImages[0]?.imageUrl && (
              <Image src={activity.subImages[0].imageUrl} alt="" width={293.5} height={263} />
            )}
          </div>
          <div className={S.subImage}>
            {activity?.subImages[1]?.imageUrl && (
              <Image src={activity.subImages[1].imageUrl} alt="" width={293.5} height={263} />
            )}
          </div>
          <div className={S.subImage}>
            {activity?.subImages[2]?.imageUrl && (
              <Image src={activity.subImages[2].imageUrl} alt="" width={293.5} height={263} />
            )}
          </div>
          <div className={S.subImage}>
            {activity?.subImages[3]?.imageUrl && (
              <Image src={activity.subImages[3].imageUrl} alt="" width={293.5} height={263} />
            )}
          </div>
        </div>
      </div>

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
          <div className={S.address}>{activity?.address}</div>
        </div>
      </div>
      <hr className={S.hr} />
    </>
  );
}
