import Image from 'next/image';
import S from './HeadCountStepper.module.scss';
import addIcon from '@/images/icons/icon-add.svg';
import subtractIcon from '@/images/icons/icon-subtract.svg';
import { useReservationStore } from '@/stores/useReservationStore';

export default function HeadCountStepper() {
  const { headCount } = useReservationStore(state => state.reservation);
  const { decreaseHeadCount, increaseHeadCount } = useReservationStore(state => state.action);
  return (
    <section className={S.headCountContainer}>
      <p className={S.sectionTitle}>참여 인원수</p>
      <div className={S.headCountStepper}>
        <button onClick={decreaseHeadCount}>
          <Image src={subtractIcon} alt="인원수 감소 버튼" height={20} width={20} />
        </button>
        <p>{headCount}</p>
        <button onClick={increaseHeadCount}>
          <Image src={addIcon} alt="인원수 증가 버튼" height={20} width={20} />
        </button>
      </div>
    </section>
  );
}
