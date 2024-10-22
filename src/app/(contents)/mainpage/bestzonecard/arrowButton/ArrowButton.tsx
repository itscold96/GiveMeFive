import S from './ArrowButton.module.scss';
import ArrowLeftGray from '@/images/arrowleft-gray.svg';
import ArrowLeftBlack from '@/images/arrowleft-black.svg';
import ArrowRightGray from '@/images/arrowright-gray.svg';
import ArrowRightBlack from '@/images/arrowright-black.svg';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';

interface ArrowButtonProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
}

export default function ArrowButton({ setPage, totalCount }: ArrowButtonProps) {
  const totalPage = useMemo(() => {
    return Math.ceil(totalCount / 3);
  }, [totalCount]);

  const disabled = useMemo(() => {
    return totalCount <= 3;
  }, [totalCount]);

  const onClickBtn = useCallback(
    (type: 'left' | 'right') => {
      if (disabled) return;

      setPage(prev => {
        if (type === 'left') {
          return prev === 1 ? totalPage : prev - 1;
        } else {
          return prev === totalPage ? 1 : prev + 1;
        }
      });
    },
    [totalPage, disabled, setPage],
  );

  return (
    <div className={S.arrowButtonContainer}>
      <button className={S.arrowButton} onClick={() => onClickBtn('left')} disabled={disabled}>
        <Image src={disabled ? ArrowLeftGray : ArrowLeftBlack} alt="left" />
      </button>
      <button className={S.arrowButton} onClick={() => onClickBtn('right')} disabled={disabled}>
        <Image src={disabled ? ArrowRightGray : ArrowRightBlack} alt="right" />
      </button>
    </div>
  );
}
