import dayjs from 'dayjs';
import S from './ReservationCalendar.module.scss';
import { Calendar, CalendarProps, CalendarStylesNames } from '@mantine/dates';
import classNames from 'classnames';

interface ReservationCalendarProps extends CalendarProps {
  selectedDate: Date;
  onClickDate: (date: Date) => void;
  mantineCalendarClassNames?: Partial<Record<CalendarStylesNames, string>>;
  availableDates?: string[];
  availableDatesStyle?: string;
}

export default function ReservationCalendar({
  selectedDate,
  availableDates,
  onClickDate,
  mantineCalendarClassNames,
  availableDatesStyle,
  ...props
}: ReservationCalendarProps) {
  const getDayProps = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const isAvailable = availableDates?.includes(formattedDate); // 해당 날짜가 선택 가능한 날짜 배열에 있는 지 검사
    const isSelected = dayjs(selectedDate).isSame(dayjs(date), 'day');

    return {
      selected: isSelected,
      onClick: () => onClickDate(date),
      className: classNames({ [availableDatesStyle || S.availableDates]: isAvailable }), // 예약 가능 일에 스타일 부여
      disabled: isAvailable !== undefined && !isAvailable, // 예약 가능일이 아니면 선택 불가
    };
  };

  return (
    <div className={S.calendarWrapper}>
      <Calendar
        date={selectedDate}
        firstDayOfWeek={0}
        // levelsGroup, day 스타일의 경우, 기본적으로 피그마 스타일대로 구현한 스타일을 따른다.
        // mantineCalendarClassNames.day에 특정 스타일이 없다면 S.day에서 설정한 스타일이 유지되고,
        // 같은 스타일 속성이 있을 경우 mantineCalendarClassNames.day가 우선함.
        classNames={{
          ...mantineCalendarClassNames,
          levelsGroup: classNames(S.levelsGroup, mantineCalendarClassNames?.levelsGroup),
          day: classNames(S.day, mantineCalendarClassNames?.day),
        }}
        {...props}
        getDayProps={getDayProps}
      />
    </div>
  );
}
