'use client';

import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import S from './Reservation.module.scss';
import Button from '../@shared/button/Button';
import dayjs from 'dayjs';
import { useState } from 'react';
import classNames from 'classnames';
import ReservationSelector from './ReservationSelector';
import HeadCountStepper from './HeadCountStepper';
import { useMediaQuery } from '@mantine/hooks';
import CalendarModal from './CalendarModal';
import { Time } from '@/types/schedule';

interface ReservationProps {
  activityId: number;
  price: number;
}

export default function Reservation({ activityId, price }: ReservationProps) {
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
  const [selectedTime, setSelectedTime] = useState<Time | null>(null);
  const [headCount, setHeadCount] = useState(1);

  const isTabletSize = useMediaQuery('(max-width: 1200px)');
  const perPersonPrice = `₩ ${getCurrencyFormat(price)}`;

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

  return (
    <div className={S.reservationContainer}>
      <section className={S.priceContainer}>
        <p>
          {perPersonPrice}
          <span className={S.perPerson}> /인</span>
        </p>
        <div className={S.separator} />
      </section>

      {isTabletSize ? (
        <CalendarModal
          activityId={activityId}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          handleDateSelect={handleDateSelect}
          handleTimeSelect={handleTimeSelect}
        />
      ) : (
        <ReservationSelector
          activityId={activityId}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          handleDateSelect={handleDateSelect}
          handleTimeSelect={handleTimeSelect}
        />
      )}

      <HeadCountStepper
        headCount={headCount}
        onDecreaseHeadCountClick={handleDecreaseHeadCountClick}
        onIncreaseHeadCountClick={handleIncreaseHeadCountClick}
      />

      <Button
        borderRadius="radius4"
        buttonColor="nomadBlack"
        padding="padding14"
        textSize="md"
        className={S.submitButton}
      >
        예약하기
      </Button>

      <section className={classNames(S.totalContainer, S.sectionTitle)}>
        <div className={S.separator} />
        <div className={S.totalPrice}>
          <p>총 합계</p>
          <p>{getCurrencyFormat(price * headCount)}</p>
        </div>
      </section>
    </div>
  );
}
