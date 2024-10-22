import { ReservationCalendarProps } from '@/types/reservation';
import S from './CalendarModal.module.scss';
import ReservationSelector from './ReservationSelector';
import Modal from '../@shared/modal/Modal';
import { useToggle } from '@/hooks/useToggle';

export default function CalendarModal({
  activityId,
  handleDateSelect,
  handleTimeSelect,
  selectedDate,
  selectedTimeId,
}: ReservationCalendarProps) {
  const { toggleValue, toggleDispatch } = useToggle();

  return (
    <>
      <p className={S.sectionTitle}>날짜</p>
      <button className={S.openCalendarButton} onClick={() => toggleDispatch({ type: 'switch' })}>
        날짜 선택하기
      </button>
      <Modal isOpen={toggleValue} onClose={() => toggleDispatch({ type: 'off' })} width="480px" className={S.modal}>
        <p className={S.modalTitle}>날짜 및 시간 선택</p>
        <ReservationSelector
          activityId={activityId}
          selectedDate={selectedDate}
          selectedTimeId={selectedTimeId}
          handleDateSelect={handleDateSelect}
          handleTimeSelect={handleTimeSelect}
        />
      </Modal>
    </>
  );
}
