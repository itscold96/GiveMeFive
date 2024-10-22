import { Schedule } from '@/types/schedule';
import S from './AvailableTimeList.module.scss';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useReservationStore } from '@/stores/useReservationStore';

export default function AvailableTimeList({ schedule }: { schedule: Schedule[] | undefined }) {
  const { selectedDate, selectedTime } = useReservationStore(state => state.reservation);
  const { setSelectedTime } = useReservationStore(state => state.action);
  const availableTimesOfSelectedDate =
    schedule
      ?.filter(schedule => schedule.date === dayjs(selectedDate).format('YYYY-MM-DD')) // 스케쥴 배열에서 선택된 날짜에 맞는 스케쥴만 필터링한 뒤, times 프로퍼티의 값만 걸러낸다.
      .map(schedule => schedule.times) // times가 배열이라 times끼리 모으면 2차원 배열이되므로 flat으로 한 겹 벗겨내어 1차원 객체 배열로 만들어준다.
      .flat() || [];

  return (
    <div className={S.availableTimeList}>
      {availableTimesOfSelectedDate.map(time => (
        <div
          key={time.id}
          className={classNames(S.availableTime, { [S.selectedTime]: selectedTime?.id === time.id })}
          onClick={() => setSelectedTime(time)}
        >
          {time.startTime} ~ {time.endTime}
        </div>
      ))}
    </div>
  );
}
