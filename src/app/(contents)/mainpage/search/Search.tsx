'use client';

import S from './Search.module.scss';
import Input from '@/app/components/@shared/input/Input';
import Button from '@/app/components/@shared/button/Button';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
// import { useMemo } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const { register, watch } = useForm<{ title: string }>({
    defaultValues: {
      title: searchParams.get('title') || '',
    },
  });
  const title = watch('title');
  const router = useRouter();
  const getQueryString = () => {
    const params = new URLSearchParams();
    params.set('title', title);
    params.set('sort', 'latest');
    params.set('page', '1');
    return params.toString();
  };

  const handleSearch = () => {
    router.push(`?${getQueryString()}`);
  };

  return (
    <div className={S.inputContainer}>
      <span className={S.inputText}>무엇을 체험하고 싶으신가요?</span>
      <div className={S.searchInputContainer}>
        <Input className={S.searchInput} placeholder="내가 원하는 체험은" register={register('title')} />
        <Button
          buttonColor="nomadBlack"
          textSize="lg"
          borderRadius="radius4"
          padding="padding8"
          className={S.buttonWidth}
          onClick={handleSearch}
        >
          검색하기
        </Button>
      </div>
    </div>
  );
}
