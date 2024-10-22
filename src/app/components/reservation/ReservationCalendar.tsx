import { useAvailableSchedule } from '@/queries/useAvailableScheduleQuery';
import S from './ReservationCalendar.module.scss';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Calendar } from '@mantine/dates';

interface ReservationCalendarProps {
  activityId: number;
  selectedDate: Date;
  selectedTimeId: number | null;
  handleDateSelect: ({ date, availableDates }: { date: Date; availableDates: string[] }) => void;
  handleTimeSelect: (id: number) => void;
}

export default function ReservationCalendar({
  activityId,
  selectedDate,
  selectedTimeId,
  handleDateSelect,
  handleTimeSelect,
}: ReservationCalendarProps) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1; // 달이 0부터 시작함
  const date = selectedDate.getDate();
  const { data: schedule } = useAvailableSchedule({ activityId, year, month, date });
  const availableDates = schedule?.map(schedule => schedule.date) || []; // 예약 가능일자 배열

  const availableTimesOfSelectedDate =
    schedule
      ?.filter(schedule => schedule.date === dayjs(selectedDate).format('YYYY-MM-DD')) // 스케쥴 배열에서 선택된 날짜에 맞는 스케쥴만 필터링한 뒤, times 프로퍼티의 값만 걸러낸다.
      .map(schedule => schedule.times) // times가 배열이라 times끼리 모으면 2차원 배열이되므로 flat으로 한 겹 벗겨내어 1차원 객체 배열로 만들어준다.
      .flat() || [];

  const getDayProps = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const isAvailable = availableDates?.includes(formattedDate); // 해당 날짜가 선택 가능한 날짜 배열에 있는 지 검사
    const isSelected = dayjs(selectedDate).isSame(dayjs(date), 'day');

    return {
      selected: isSelected,
      onClick: () => handleDateSelect({ date, availableDates }),
      className: classNames({ [S.availableDates]: isAvailable }), // 예약 가능 일에 스타일 부여
      disabled: !isAvailable, // 예약 가능일이 아니면 선택 불가
    };
  };

  return (
    <>
      <section className={S.calendarContainer}>
        <p className={S.sectionTitle}>날짜</p>
        <div className={S.calendarWrapper}>
          <Calendar
            firstDayOfWeek={0}
            classNames={{
              levelsGroup: S.levelsGroup,
              day: S.day,
            }}
            getDayProps={getDayProps}
            highlightToday
          />
        </div>
      </section>

      <section className={S.availableTimeContainer}>
        <p className={S.sectionTitle}>예약 가능한 시간</p>
        <div className={S.availableTimeList}>
          {availableTimesOfSelectedDate.map(time => (
            <div
              key={time.id}
              className={classNames(S.availableTime, { [S.selectedTime]: selectedTimeId === time.id })}
              onClick={() => handleTimeSelect(time.id)}
            >
              {time.startTime} ~ {time.endTime}
            </div>
          ))}
        </div>
        <div className={S.separator} />
      </section>
    </>
  );
}
