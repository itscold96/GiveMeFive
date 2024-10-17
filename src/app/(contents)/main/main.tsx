import Card from './card/card';
import S from './main.module.scss';
import ArrowLeft from '../../../images/arrowleft-gray.svg';
import ArrowRight from '../../../images/arrowright-gray.svg';
import Image from 'next/image';
import Input from '../../components/@shared/input/Input';
import Button from '../../components/@shared/button/Button';
import Category from './category/category';
import Dropdown from '../../components/@shared/dropdown/Dropdown';
import { Pagination } from '@mantine/core';
import '@mantine/core/styles.css';

export default function Main() {
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
        <Card />

        <div className={S.categoryDropdownContainer}>
          <Category />
          <Dropdown />
        </div>

        <div className={S.allExperienceContainer}>
          <span className={S.experienceText}>🛼 모든체험</span>
        </div>
        <Card />
        <div>
          <Pagination total={5} />
        </div>
      </div>
    </div>
  );
}
