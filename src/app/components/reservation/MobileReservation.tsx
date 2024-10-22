import S from './MobileReservation.module.scss';
import { ReservationProps } from '@/types/reservation';
import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import HeadCountStepper from './HeadCountStepper';
import Button from '../@shared/button/Button';
import { useToggle } from '@/hooks/useToggle';
import ReservationSelector from './ReservationSelector';
import Modal from '../@shared/modal/Modal';
import dayjs from 'dayjs';
import { useReservationStore } from '@/stores/useReservationStore';

export default function MobileReservation({ price, activityId }: ReservationProps) {
  const { headCount, selectedDate, selectedTime } = useReservationStore(state => state.reservation);
  const { toggleValue: isCalendarModalOpen, toggleDispatch: calendarModalToggleDispatch } = useToggle();
  const { toggleValue: isStepperModalOpen, toggleDispatch: stepperModalToggleDispatch } = useToggle();

  const totalPrice = `₩ ${getCurrencyFormat(price * headCount)}`;
  return (
    <div className={S.mobileReservationContainer}>
      <section className={S.selectorContainer}>
        <div className={S.priceAndHeadCount}>
          <p className={S.price}>{totalPrice} /</p>
          <button
            className={S.headCountButton}
            onClick={() => stepperModalToggleDispatch({ type: 'on' })}
          >{`총 ${headCount}인`}</button>
        </div>
        <button className={S.selectDateButton} onClick={() => calendarModalToggleDispatch({ type: 'on' })}>
          {selectedTime
            ? `${dayjs(selectedDate).format('YYYY/MM/DD')} ${selectedTime.startTime} ~ ${selectedTime.endTime}`
            : '날짜 선택하기'}
        </button>
      </section>

      <Modal
        isOpen={isCalendarModalOpen}
        onClose={() => calendarModalToggleDispatch({ type: 'off' })}
        width="100dvw"
        height="100dvh"
        className={S.modal}
      >
        <p className={S.modalTitle}>날짜 및 시간 선택</p>
        <ReservationSelector activityId={activityId} />

        <Button
          borderRadius="radius4"
          buttonColor="nomadBlack"
          padding="padding14"
          textSize="md"
          className={S.modalCloseButton}
          onClick={() => calendarModalToggleDispatch({ type: 'off' })}
        >
          확인
        </Button>
      </Modal>

      <Modal
        isOpen={isStepperModalOpen}
        onClose={() => stepperModalToggleDispatch({ type: 'off' })}
        width="100dvw"
        height="100dvh"
        className={S.modal}
        showCloseButton={true}
      >
        <p className={S.modalTitle}>인원 선택</p>
        <HeadCountStepper />

        <Button
          borderRadius="radius4"
          buttonColor="nomadBlack"
          padding="padding14"
          textSize="md"
          className={S.modalCloseButton}
          onClick={() => stepperModalToggleDispatch({ type: 'off' })}
        >
          확인
        </Button>
      </Modal>

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
