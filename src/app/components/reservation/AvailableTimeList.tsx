import { Schedule, Time } from '@/types/schedule';
import S from './AvailableTimeList.module.scss';
import classNames from 'classnames';
import dayjs from 'dayjs';

interface AvailableTimeListProps {
  selectedDate: Date;
  selectedTime: Time | null;
  schedule: Schedule[] | undefined;
  handleTimeSelect: (time: Time) => void;
}

export default function AvailableTimeList({
  schedule,
  selectedDate,
  selectedTime,
  handleTimeSelect,
}: AvailableTimeListProps) {
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
          onClick={() => handleTimeSelect(time)}
        >
          {time.startTime} ~ {time.endTime}
        </div>
      ))}
    </div>
  );
}
