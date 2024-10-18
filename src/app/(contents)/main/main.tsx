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
import { Activities, getActivities } from '@/api/activities';
import { useActivityStore } from '@/stores/useActivityStore';

export default function Main() {
  const { activities, setActivities } = useActivityStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('투어');
  const [selectedSort, setSelectedSort] = useState<string>('price_asc');

  useEffect(() => {
    getActivities({
      category: selectedCategory as CategoryType,
      sort: selectedSort as 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest',
      method: 'cursor',
      cursorId: null,
    }).then(setActivities);
  }, [selectedCategory, selectedSort, setActivities]);

  const handleSortChange = (value: string) => {
    setSelectedSort(value as 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest');
  };

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

        <BestZoneCard />

        <CategoryAndDropdown
          selectedCategory={selectedCategory as CategoryType}
          setSelectedCategory={setSelectedCategory}
          selectedSort={selectedSort}
          handleSortChange={handleSortChange}
        />

        <div className={S.allExperienceContainer}>
          <span className={S.experienceText}>🛼 모든체험</span>
        </div>
        <BestZoneCard />
      </div>
      <Pagination />
    </div>
  );
}
