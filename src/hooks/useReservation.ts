import { Time } from '@/types/schedule';
import dayjs from 'dayjs';
import { useState } from 'react';

export const useReservation = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
  const [selectedTime, setSelectedTime] = useState<Time | null>(null);
  const [headCount, setHeadCount] = useState(1);

  const handleDateSelect = ({ date, availableDates }: { date: Date; availableDates: string[] }) => {
    if (availableDates?.includes(dayjs(date).format('YYYY-MM-DD'))) {
      setSelectedDate(date); // 예약 가능일일 때만 선택 가능하게 설정
      setSelectedTime(null); // 날짜 바꾸면 기존 선택된 예약 시간 초기화
    }
  };

  const handleTimeSelect = (time: Time) => {
    setSelectedTime(time);
  };

  const handleDecreaseHeadCountClick = () => {
    setHeadCount(prevState => Math.max(prevState - 1, 1));
  };

  const handleIncreaseHeadCountClick = () => {
    setHeadCount(prevState => prevState + 1);
  };

  return {
    selectedDate,
    selectedTime,
    headCount,
    handleDateSelect,
    handleTimeSelect,
    handleDecreaseHeadCountClick,
    handleIncreaseHeadCountClick,
  };
};
