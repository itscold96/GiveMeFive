'use client';
import { useValidForm, ValidationConfig } from '@/hooks/useValidForm';
import { VALID_OPTIONS } from '@/constants/validOption';
import { FieldValues } from 'react-hook-form';
import Input from '../@shared/input/Input';
import Dropdown from '../@shared/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import S from '@/app/components/addexperienceform/AddExperienceForm.module.scss';
import DaumAddress from '../daumAdress/DaumAddress';
import Textarea from '../textarea/Textarea';
import { useEffect } from 'react';
import DatePickerInput from '../dateTimeInput/DateTimeInput';
import BannerImageInput from '../bannerImageInput/BannerImageInput';
import SubImageInput from '../subImageInput/SubImageInput';
import Button from '../@shared/button/Button';
const CATEGORY = ['문화·예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
const config: ValidationConfig = {
  // 키값이 입력 필드의 name이 됩니다.
  title: {
    required: '해당 입력란은 비워둘 수 없습니다.', // true, false 또는 massage(위반 시 메시지란에 자동으로 들어가는 문자열)를 입력할 수 있습니다.
    minLength: {
      value: 2, // 최소 길이
      message: '2자 이상으로 작성해주세요.', // 위반 시 표출될 메시지
    },
    maxLength: VALID_OPTIONS.maxLength20, // 자주 쓰는 옵션은 상수 파일에 따로 몇가지 만들어두었습니다. 향후 직접 추가하셔도 됩니다.
  },
  category: {
    required: '해당 입력란은 비워둘 수 없습니다.',
  },
  description: {
    required: '해당 입력란은 비워둘 수 없습니다.',
    minLength: {
      value: 2,
      message: '2자 이상으로 작성해주세요.',
    },
    maxLength: VALID_OPTIONS.maxLength50,
  },
  price: {
    required: '해당 입력란은 비워둘 수 없습니다.',
    minLength: {
      value: 2, // 최소 길이
      message: '2자 이상으로 작성해주세요.',
    },
    maxLength: VALID_OPTIONS.maxLength20,
  },
  address: {
    required: '해당 입력란은 비워둘 수 없습니다.',
    minLength: {
      value: 2, // 최소 길이
      message: '2자 이상으로 작성해주세요.',
    },
    maxLength: VALID_OPTIONS.maxLength50,
  },
  schedules: {
    required: '최소 1개 이상의 예약 가능한 시간대가 필요합니다.',
  },
  bannerImageUrl: {
    required: '최소 1개 이상의 배너 이미지가 필요합니다.',
  },
  subImageUrls: {
    required: '최소 1개 이상의 소개 이미지가 필요합니다.',
  },
};

export default function AddExperienceForm() {
  const { data, onDropdownChange, toggleDropdown, isDropdownToggle, selectedValue } = useDropdown(CATEGORY);
  const { errors, register, handleSubmit, reset, getValues, setValue } = useValidForm({ validationConfig: config });
  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.validTest && formData.validTestConfirmation) {
      const { validTest, validTestConfirmation } = formData;
      console.log('validTest:', validTest);
      console.log('validTestConfirmation:', validTestConfirmation);

      reset(); // 모든 입력 필드를 기본값으로 되돌립니다.
      // reset({ validTest: 'reset' }); // 각 입력 필드의 이름과 바꾸고 싶은 값을 줄 수도 있습니다.
    }
  };

  const checkFieldClick = () => {
    const values = getValues(); // 필드 전체 객체 반환
    console.log('values:', values);
  };

  useEffect(() => {
    const handleCategory = () => {
      setValue('category', selectedValue);
    };
    handleCategory();
  }, [selectedValue]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '50px' }}
      >
        <div className={S.head}>
          <div className={S.headText}>내 체험 등록</div>
          <Button
            buttonColor="nomadBlack"
            textSize="md"
            padding="padding14"
            borderRadius="radius4"
            className={S.submitButton}
            type="submit"
            onClick={checkFieldClick}
          >
            등록하기
          </Button>
        </div>
        <Input placeholder="제목" error={errors.title} register={register.title} message={errors.title?.message} />
        <Dropdown
          data={data}
          selectedValue={selectedValue}
          type="category"
          onChange={onDropdownChange}
          toggleDropdown={toggleDropdown}
          isDropdownToggle={isDropdownToggle}
        />
        <Textarea
          className={S.textarea}
          placeholder="설명"
          error={errors.description}
          register={register.description}
          message={errors.description?.message}
        />
        <Input
          label="가격"
          htmlFor="price"
          placeholder="가격"
          error={errors.price}
          register={register.price}
          message={errors.price?.message}
          type="number"
        />
        <DaumAddress errors={errors} register={register} setValue={setValue} />
        <label htmlFor="availableTime">예약 가능한 시간대</label>
        <DatePickerInput
          setValue={setValue}
          getValues={getValues}
          id="availableTime"
          error={errors.schedules}
          message={errors.schedules?.message}
        />
        <BannerImageInput error={errors.bannerImageUrl} message={errors.bannerImageUrl?.message} setValue={setValue} />
        <SubImageInput error={errors.subImageUrls} message={errors.subImageUrls?.message} setValue={setValue} />
      </form>
    </div>
  );
}
