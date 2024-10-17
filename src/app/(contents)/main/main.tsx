'use client';

import CommonCard from './card/CommonCard';
import S from './main.module.scss';
import ArrowLeft from '../../../images/arrowleft-gray.svg';
import ArrowRight from '../../../images/arrowright-gray.svg';
import Image from 'next/image';
import Input from '../../components/@shared/input/Input';
import Button from '../../components/@shared/button/Button';
import CategoryAndDropdown, { Category as CategoryType } from './category/CategoryAndDropdown';
import { useEffect, useState } from 'react';
import Pagination from './pagination/Pagination';
import BestZoneCard from './card/bestzonecard/BestZoneCard';
import { Activities, getActivities } from '@/api/activities';

export default function Main() {
  const [selectedSort, setSelectedSort] = useState<'most_reviewed' | 'price_asc' | 'price_desc' | 'latest'>(
    'price_asc',
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('문화 · 예술');

  const [activities, setActivities] = useState<Activities>({
    cursorId: 0,
    totalCount: 0,
    activities: [],
  });

  const handleSortChange = (value: string) => {
    setSelectedSort(value as 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest');
  };

  useEffect(() => {
    getActivities({ category: selectedCategory, sort: selectedSort }).then(setActivities);
  }, [selectedCategory, selectedSort]);

  return (
    <div>
      <div className={S.bannerContainer} />

      <div className={S.mainContainer}>
        <div className={S.inputContainer}>
          <span className={S.inputText}>무엇을 체험하고 싶으신가요?</span>
          <div className={S.searchInputContainer}>
            <Input className={S.searchInput} placeholder="내가 원하는 체험은" />
            <Button
              buttonColor="nomadBlack"
              textSize="lg"
              borderRadius="radius4"
              padding="padding8"
              className={S.buttonWidth}
            >
              검색하기
            </Button>
          </div>
        </div>

        <div className={S.bestExperienceContainer}>
          <span className={S.experienceText}>🔥 인기체험</span>
          <div className={S.experienceArrowContainer}>
            <Image src={ArrowLeft} alt="left" />
            <Image src={ArrowRight} alt="right" />
          </div>
        </div>

        <BestZoneCard activities={activities.activities} />

        <CategoryAndDropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSort={selectedSort}
          handleSortChange={handleSortChange}
        />

        <div className={S.allExperienceContainer}>
          <span className={S.experienceText}>🛼 모든체험</span>
        </div>
        <CommonCard>
          <div className={S.cardLarge}>
            <div className={S.cardLargeImage} />
            <div className={S.cardLargeText} />
          </div>
        </CommonCard>
      </div>
      <Pagination />
    </div>
  );
}
