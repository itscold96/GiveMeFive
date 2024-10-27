'use client';

import S from './ActivityInfo.module.scss';
import star from '@/images/star-icon.svg';
import location from '@/images/location.svg';
import left from '@/images/arrow-left.svg';
import right from '@/images/arrow-right.svg';
import Image from 'next/image';
import Dropdown from '@/app/components/@shared/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import { useDetailActivitiesQuery } from '@/queries/useActivityInfoQuery';
import Map from './map';
import { useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';

export default function ActivityInfo({ params }: { params: { id: string } }) {
  const activityId = Number(params.id);
  const { data: activity } = useDetailActivitiesQuery(activityId);

  const dropdownList = ['수정하기', '삭제하기'];

  const { onDropdownChange, toggleDropdown, isDropdownToggle } = useDropdown(dropdownList);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [activity?.bannerImageUrl, ...(activity?.subImages?.map(img => img.imageUrl) || [])].filter(
    Boolean,
  );

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + allImages.length) % allImages.length);
  };

  const user = useUserStore(state => state.user);

  return (
    <>
      <div className={S.activityInfo}>
        <div className={S.categoryAndTitleContainer}>
          <div>
            <div className={S.category}>{activity?.category}</div>
            <div className={S.title}>{activity?.title}</div>
          </div>

          {/* 비로그인 시 드롭다운 노출 안되게 */}
          {user && (
            <Dropdown
              type="kebab"
              data={dropdownList}
              onChange={onDropdownChange}
              toggleDropdown={toggleDropdown}
              isDropdownToggle={isDropdownToggle}
            />
          )}
        </div>

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

      <div className={S.imageContainer}>
        <div className={S.mainImageContainer}>
          {allImages[currentImageIndex] && (
            <Image src={allImages[currentImageIndex]} alt="" layout="fill" objectFit="cover" />
          )}
          <div className={S.imageNavigation}>
            <button onClick={prevImage} className={S.navButton}>
              <Image src={left} alt="" width={24} height={47} />
            </button>
            <button onClick={nextImage} className={S.navButton}>
              <Image src={right} alt="" width={24} height={47} />
            </button>
          </div>
        </div>
        {allImages.length > 1 && (
          <div className={`${S.subImagesContainer} ${S[`subImageCount${Math.min(allImages.length - 1, 4)}`]}`}>
            {allImages.slice(1, 5).map(
              (image, index) =>
                image && (
                  <div key={index} className={S.subImage}>
                    <Image src={image} alt={`서브 이미지 ${index + 1}`} layout="fill" objectFit="cover" />
                  </div>
                ),
            )}
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
