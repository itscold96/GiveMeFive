import { useAvailableSchedule } from '@/queries/useAvailableScheduleQuery';
import S from './ReservationSelector.module.scss';
import AvailableTimeList from './AvailableTimeList';
import { useReservationStore } from '@/stores/useReservationStore';
import ReservationCalendar from '../@shared/reservationCalendar/ReservationCalendar';

export default function ReservationSelector({ activityId }: { activityId: number }) {
  const { selectedDate } = useReservationStore(state => state.reservation);
  const { setSelectedDate } = useReservationStore(state => state.action);
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1; // 달이 0부터 시작함
  const date = selectedDate.getDate();
  const { data: schedule } = useAvailableSchedule({ activityId, year, month, date });
  const availableDates = schedule?.map(schedule => schedule.date) || []; // 예약 가능일자 배열

  return (
    <>
      <section className={S.calendarContainer}>
        <p className={S.sectionTitle}>날짜</p>
        <ReservationCalendar
          selectedDate={selectedDate} // 선택된 날짜
          onClickDate={setSelectedDate} // 날짜 클릭 시 실행될 함수, 자동으로 매개변수로 클릭한 날짜 (date:Date)를 받도록 제작하였습니다.
          availableDates={availableDates} // 선택 가능한 날짜를 (YYYY-MM-DD) 포맷 배열로 넣어주면 됩니다.
          // 필요한 것이 있다면 Mantine 공식 문서를 참조하여 아래와 같이 추가 작성하면 됩니다.
          onNextMonth={date => setSelectedDate(date)}
          onPreviousMonth={date => setSelectedDate(date)}
          highlightToday
        />
      </section>

      <section className={S.availableTimeContainer}>
        <p className={S.sectionTitle}>예약 가능한 시간</p>
        <AvailableTimeList schedule={schedule} />
        <div className={S.separator} />
      </section>
    </>
  );
}
