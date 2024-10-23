import S from './MobileReservation.module.scss';
import { ReservationProps } from '@/types/reservation';
import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import HeadCountStepper from './HeadCountStepper';
import Button from '../@shared/button/Button';
import { useToggle } from '@/hooks/useToggle';
import ReservationSelector from './ReservationSelector';
import dayjs from 'dayjs';
import { useReservationStore } from '@/stores/useReservationStore';
import ReservationModal from './ReservationModal';

export default function MobileReservation({ price, activityId }: ReservationProps) {
  const { headCount, selectedDate, selectedTime } = useReservationStore(state => state.reservation);
  const { toggleValue: isSelectDateModalOpen, toggleDispatch: SelectDateModalToggleDispatch } = useToggle();
  const { toggleValue: isStepperModalOpen, toggleDispatch: stepperModalToggleDispatch } = useToggle();
  const selectDateModalButtonText = selectedTime
    ? `${dayjs(selectedDate).format('YYYY/MM/DD')} ${selectedTime.startTime} ~ ${selectedTime.endTime}`
    : '날짜 선택하기';

  const totalPrice = `₩ ${getCurrencyFormat(price * headCount)}`;
  return (
    <div className={S.mobileReservationContainer}>
      <section className={S.selectorContainer}>
        <div className={S.priceAndHeadCount}>
          <p className={S.price}>{totalPrice} /</p>
          <ReservationModal
            triggerButtonText={`총 ${headCount}인`}
            isModalOpen={isStepperModalOpen}
            modalTitle="인원 선택"
            onCloseModal={() => stepperModalToggleDispatch({ type: 'off' })}
            onTriggerButtonClick={() => stepperModalToggleDispatch({ type: 'on' })}
            triggerButtonClassName={S.headCountButton}
          >
            <HeadCountStepper />
          </ReservationModal>
        </div>
        <ReservationModal
          triggerButtonText={selectDateModalButtonText}
          isModalOpen={isSelectDateModalOpen}
          modalTitle="날짜 및 시간 선택"
          onCloseModal={() => SelectDateModalToggleDispatch({ type: 'off' })}
          onTriggerButtonClick={() => SelectDateModalToggleDispatch({ type: 'on' })}
          triggerButtonClassName={S.selectDateButton}
        >
          <ReservationSelector activityId={activityId} />
        </ReservationModal>
      </section>
      <Button
        borderRadius="radius4"
        buttonColor="nomadBlack"
        padding="padding14"
        textSize="md"
        className={S.submitButton}
      >
        예약하기
      </Button>
    </div>
  );
}
