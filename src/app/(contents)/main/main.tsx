'use client';

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
import { getActivities } from '@/api/activities';
import { useActivityStore } from '@/stores/useActivityStore';
import AllZoneCard from './card/allzonecard/AllZoneCard';
import Banner from './banner/Banner';

export default function Main() {
  const { activities, setActivities, bestActivities, setBestActivities } = useActivityStore();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | undefined>(undefined);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };

  useEffect(() => {
    getActivities({
      category: selectedCategory ?? undefined,
      sort: selectedSort as 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest',
      method: 'cursor',
      cursorId: null,
      limit: 8,
    }).then(setActivities);
  }, [selectedCategory, selectedSort, setActivities]);

  useEffect(() => {
    // 베스트존 활동을 따로 가져와서 상태로 관리
    if (bestActivities.length === 0) {
      getActivities({
        sort: 'most_reviewed',
        method: 'cursor',
        cursorId: null,
        limit: 3,
      }).then(response => setBestActivities(response.activities.slice(0, 3)));
    }
  }, [bestActivities.length, setBestActivities]);

  return (
    <div>
      <Banner />

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

        <BestZoneCard activities={bestActivities.slice(0, 3)} />

        <CategoryAndDropdown
          selectedCategory={selectedCategory as CategoryType}
          setSelectedCategory={setSelectedCategory}
          selectedSort={selectedSort as string}
          handleSortChange={handleSortChange}
        />

        <div className={S.allExperienceContainer}>
          <span className={S.experienceText}>🛼 모든체험</span>
        </div>
        <AllZoneCard activities={activities} />
      </div>
      <Pagination />
    </div>
  );
}
