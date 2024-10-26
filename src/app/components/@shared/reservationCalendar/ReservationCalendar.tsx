import dayjs from 'dayjs';
import S from './ReservationCalendar.module.scss';
import { Calendar, CalendarProps } from '@mantine/dates';
import classNames from 'classnames';

interface ReservationCalendar extends CalendarProps {
  selectedDate: Date;
  availableDates: string[];
  onClickDate: (date: Date) => void;
}

export default function ReservationCalendar({
  selectedDate,
  availableDates,
  onClickDate,
  ...props
}: ReservationCalendar) {
  const getDayProps = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const isAvailable = availableDates?.includes(formattedDate); // 해당 날짜가 선택 가능한 날짜 배열에 있는 지 검사
    const isSelected = dayjs(selectedDate).isSame(dayjs(date), 'day');

    return {
      selected: isSelected,
      onClick: () => onClickDate(date),
      className: classNames({ [S.availableDates]: isAvailable }), // 예약 가능 일에 스타일 부여
      disabled: !isAvailable, // 예약 가능일이 아니면 선택 불가
    };
  };

  return (
    <div className={S.calendarWrapper}>
      <Calendar
        date={selectedDate}
        firstDayOfWeek={0}
        classNames={{
          levelsGroup: S.levelsGroup,
          day: S.day,
        }}
        {...props}
        getDayProps={getDayProps}
      />
    </div>
  );
}
