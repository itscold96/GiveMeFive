import S from './ArrowButton.module.scss';
import ArrowLeftGray from '../../../../images/arrowleft-gray.svg';
import ArrowLeftBlack from '../../../../images/arrowleft-black.svg';
import ArrowRightGray from '../../../../images/arrowright-gray.svg';
import ArrowRightBlack from '../../../../images/arrowright-black.svg';
import Image from 'next/image';

interface ArrowButtonProps {
  isGray: boolean;
  onChangePage: (page: number) => void;
  defaultValue: number;
}

export default function ArrowButton({ isGray, onChangePage, defaultValue }: ArrowButtonProps) {
  return (
    <div className={S.arrowButtonContainer}>
      <button className={S.arrowButton} onClick={() => onChangePage(defaultValue - 1)}>
        <Image src={isGray ? ArrowLeftGray : ArrowLeftBlack} alt="left" />
      </button>
      <button className={S.arrowButton} onClick={() => onChangePage(defaultValue + 1)}>
        <Image src={isGray ? ArrowRightGray : ArrowRightBlack} alt="right" />
      </button>
    </div>
  );
}
