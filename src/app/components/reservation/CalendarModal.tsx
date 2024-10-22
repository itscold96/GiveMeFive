import { ReservationComponentProps } from '@/types/reservation';
import S from './CalendarModal.module.scss';
import ReservationSelector from './ReservationSelector';
import Modal from '../@shared/modal/Modal';
import { useToggle } from '@/hooks/useToggle';
import dayjs from 'dayjs';

export default function CalendarModal({
  activityId,
  handleDateSelect,
  handleTimeSelect,
  selectedDate,
  selectedTime,
}: ReservationComponentProps) {
  const { toggleValue, toggleDispatch } = useToggle();

  return (
    <>
      <p className={S.sectionTitle}>날짜</p>
      <button className={S.openCalendarButton} onClick={() => toggleDispatch({ type: 'switch' })}>
        {selectedTime
          ? `${dayjs(selectedDate).format('YYYY/MM/DD')} ${selectedTime.startTime} ~ ${selectedTime.endTime}`
          : '날짜 선택하기'}
      </button>
      <Modal isOpen={toggleValue} onClose={() => toggleDispatch({ type: 'off' })} width="480px" className={S.modal}>
        <p className={S.modalTitle}>날짜 및 시간 선택</p>
        <ReservationSelector
          activityId={activityId}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          handleDateSelect={handleDateSelect}
          handleTimeSelect={handleTimeSelect}
        />
      </Modal>
    </>
  );
}
