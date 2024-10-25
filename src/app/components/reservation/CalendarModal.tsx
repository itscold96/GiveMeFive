import S from './CalendarModal.module.scss';
import ReservationSelector from './ReservationSelector';
import { useToggle } from '@/hooks/useToggle';
import dayjs from 'dayjs';
import { useReservationStore } from '@/stores/useReservationStore';
import ReservationModal from './ReservationModal';

export default function CalendarModal({ activityId }: { activityId: number }) {
  const { selectedDate, selectedTime } = useReservationStore(state => state.reservation);
  const { toggleValue, toggleDispatch } = useToggle();
  const selectDateModalButtonText = selectedTime
    ? `${dayjs(selectedDate).format('YYYY/MM/DD')} ${selectedTime.startTime} ~ ${selectedTime.endTime}`
    : '날짜 선택하기';

  return (
    <>
      <p className={S.sectionTitle}>날짜</p>

      <ReservationModal
        triggerButtonText={selectDateModalButtonText}
        isModalOpen={toggleValue}
        modalTitle="날짜 및 시간 선택"
        onCloseModal={() => toggleDispatch({ type: 'off' })}
        onTriggerButtonClick={() => toggleDispatch({ type: 'on' })}
        triggerButtonClassName={S.openCalendarButton}
        modalHeight="auto"
        modalWidth="auto"
      >
        <ReservationSelector activityId={activityId} />
      </ReservationModal>
    </>
  );
}
