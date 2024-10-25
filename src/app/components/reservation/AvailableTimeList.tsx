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
      ?.filter(schedule => dayjs(schedule.date).isSame(selectedDate, 'day')) // 선택된 날짜와 같은 스케줄만 필터링
      .map(schedule => schedule.times) // 스케줄의 times 배열만 추출
      .flat() // times 배열끼리 모여있는 2차원 배열을 1차원 time 배열로 변환
      .filter(time => {
        // 시작 시간이 현재 시간 이후인 예약만 필터링
        const selectedDay = dayjs(selectedDate); // 선택된 날짜의 dayjs 객체
        const [startHour, startMinute] = time.startTime.split(':').map(Number); // 시간을 분리해서 숫자로 변환
        const startDateTime = selectedDay.set('hour', startHour).set('minute', startMinute); // 선택된 날짜에 시간 추가
        return startDateTime.isAfter(dayjs(), 'minute'); // 현재 시간과 비교
      }) || [];

  return (
    <div className={S.availableTimeList}>
      {availableTimesOfSelectedDate?.length === 0 && (
        <p className={S.noAvailableTime}>해당 날짜에 예약 가능한 시간이 없습니다.</p>
      )}
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
