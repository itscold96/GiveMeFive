import S from './ArrowButton.module.scss';
import ArrowLeftGray from '@/images/arrowleft-gray.svg';
import ArrowLeftBlack from '@/images/arrowleft-black.svg';
import ArrowRightGray from '@/images/arrowright-gray.svg';
import ArrowRightBlack from '@/images/arrowright-black.svg';
import Image from 'next/image';
import { useCallback } from 'react';

interface ArrowButtonProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  size: number;
}

export default function ArrowButton({ page, setPage, totalItems, size }: ArrowButtonProps) {
  const isFirstPage = page === 1;
  const isLastPage = page * size >= totalItems;

  const onClickBtn = useCallback(
    (type: 'left' | 'right') => {
      setPage(prev => {
        if (type === 'left' && !isFirstPage) {
          return prev - 1;
        } else if (type === 'right' && !isLastPage) {
          return prev + 1;
        }
        return prev;
      });
    },
    [setPage, isFirstPage, isLastPage],
  );

  return (
    <div className={S.arrowButtonContainer}>
      <button className={S.arrowButton} onClick={() => onClickBtn('left')} disabled={isFirstPage}>
        <Image src={isFirstPage ? ArrowLeftGray : ArrowLeftBlack} alt="left" />
      </button>
      <button className={S.arrowButton} onClick={() => onClickBtn('right')} disabled={isLastPage}>
        <Image src={isLastPage ? ArrowRightGray : ArrowRightBlack} alt="right" />
      </button>
    </div>
  );
}
