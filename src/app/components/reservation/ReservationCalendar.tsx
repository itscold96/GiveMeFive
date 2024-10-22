import { Calendar, DayProps } from '@mantine/dates';
import S from './ReservationCalendar.module.scss';

interface ReservationCalendarProps {
  getDayProps: ((date: Date) => Omit<Partial<DayProps>, 'classNames' | 'styles' | 'vars'>) | undefined;
}

export default function ReservationCalendar({ getDayProps }: ReservationCalendarProps) {
  return (
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
  );
}
