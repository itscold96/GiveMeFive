import { useAvailableSchedule } from '@/queries/useAvailableScheduleQuery';
import S from './ReservationSelector.module.scss';
import dayjs from 'dayjs';
import classNames from 'classnames';
import ReservationCalendar from './ReservationCalendar';
import AvailableTimeList from './AvailableTimeList';
import { ReservationComponentProps } from '@/types/reservation';

export default function ReservationSelector({
  activityId,
  selectedDate,
  selectedTime,
  handleDateSelect,
  handleTimeSelect,
}: ReservationComponentProps) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1; // 달이 0부터 시작함
  const date = selectedDate.getDate();
  const { data: schedule } = useAvailableSchedule({ activityId, year, month, date });
  const availableDates = schedule?.map(schedule => schedule.date) || []; // 예약 가능일자 배열

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
        <ReservationCalendar getDayProps={getDayProps} />
      </section>

      <section className={S.availableTimeContainer}>
        <p className={S.sectionTitle}>예약 가능한 시간</p>
        <AvailableTimeList
          selectedDate={selectedDate}
          schedule={schedule}
          handleTimeSelect={handleTimeSelect}
          selectedTime={selectedTime}
        />
        <div className={S.separator} />
      </section>
    </>
  );
}
