'use client';

'use client';

import S from './Search.module.scss';
import Input from '@/app/components/@shared/input/Input';
import Button from '@/app/components/@shared/button/Button';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';

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
    const trimmedTitle = title?.trim() || '';

    if (trimmedTitle) {
      params.set('title', trimmedTitle);
      params.set('keyword', trimmedTitle);
      params.set('method', 'offset');
      params.set('sort', 'latest');
      params.set('page', '1');
      params.set('size', '16');
      return params.toString();
    }

    return '';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title?.trim() || '';
    if (!trimmedTitle) {
      return;
    }
    router.push(`?${getQueryString()}`);
  };

  return (
    <div className={S.inputContainer}>
      <span className={S.inputText}>무엇을 체험하고 싶으신가요?</span>
      <form onSubmit={handleSearch} className={S.searchInputContainer}>
        <Input className={S.searchInput} placeholder="내가 원하는 체험은" register={register('title')} />
        <Button
          type="submit"
          buttonColor="nomadBlack"
          textSize="lg"
          borderRadius="radius4"
          padding="padding8"
          className={S.buttonWidth}
        >
          검색하기
        </Button>
      </form>
    </div>
  );
}
