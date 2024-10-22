import Image from 'next/image';
import S from './HeadCountStepper.module.scss';
import addIcon from '@/images/icons/icon-add.svg';
import subtractIcon from '@/images/icons/icon-subtract.svg';

interface HeadCountStepperProps {
  headCount: number;
  onDecreaseHeadCountClick: () => void;
  onIncreaseHeadCountClick: () => void;
}

export default function HeadCountStepper({
  headCount,
  onDecreaseHeadCountClick,
  onIncreaseHeadCountClick,
}: HeadCountStepperProps) {
  return (
    <section className={S.headCountContainer}>
      <p className={S.sectionTitle}>참여 인원수</p>
      <div className={S.headCountStepper}>
        <button onClick={onDecreaseHeadCountClick}>
          <Image src={subtractIcon} alt="인원수 감소 버튼" height={20} width={20} />
        </button>
        <p>{headCount}</p>
        <button onClick={onIncreaseHeadCountClick}>
          <Image src={addIcon} alt="인원수 증가 버튼" height={20} width={20} />
        </button>
      </div>
    </section>
  );
}
