import S from './CalendarModal.module.scss';
import ReservationSelector from './ReservationSelector';
import Modal from '../@shared/modal/Modal';
import { useToggle } from '@/hooks/useToggle';
import dayjs from 'dayjs';
import { useReservationStore } from '@/stores/useReservationStore';

export default function CalendarModal({ activityId }: { activityId: number }) {
  const { selectedDate, selectedTime } = useReservationStore(state => state.reservation);
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
        <ReservationSelector activityId={activityId} />
      </Modal>
    </>
  );
}
