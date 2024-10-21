'use client';

import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import S from './Reservation.module.scss';
import Button from '../@shared/button/Button';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import { useState } from 'react';
import classNames from 'classnames';

interface ReservationProps {
  price: number;
}

// 2962: 테스트용 체험 id

export default function Reservation({ price }: ReservationProps) {
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
  const perPersonPrice = `₩ ${getCurrencyFormat(price)}`;
  const availableDates = ['2024-10-25', '2024-10-28', '2024-10-30']; // 예약 가능일 예시

  const handleSelect = (date: Date) => {
    if (availableDates.includes(dayjs(date).format('YYYY-MM-DD'))) {
      setSelectedDate(date); // 예약 가능일일 때만 선택 가능하게 설정
    }
  };

  const getDayProps = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const isAvailable = availableDates.includes(formattedDate); // 해당 날짜가 선택 가능한 날짜 배열에 있는 지 검사
    const isSelected = dayjs(selectedDate).isSame(dayjs(date), 'day');

    return {
      selected: isSelected,
      onClick: () => handleSelect(date),
      className: classNames({ [S.availableDay]: isAvailable }), // 예약 가능 일에 스타일 부여
      disabled: !isAvailable, // 예약 가능일이 아니면 선택 불가
    };
  };

  return (
    <div className={S.reservationContainer}>
      <section className={S.price}>
        <p>
          {perPersonPrice}
          <span className={S.perPerson}> /인</span>
        </p>
      </section>
      <div className={S.separator} />
      <section>
        <p className={S.calendarSectionTitle}>날짜</p>
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
      <section>
        <p className={S.calendarSectionTitle}>예약 가능한 시간</p>
      </section>
      <div className={S.separator} />
      <section>
        <p className={S.calendarSectionTitle}>참여 인원수</p>
      </section>
      <Button
        borderRadius="radius4"
        buttonColor="nomadBlack"
        padding="padding14"
        textSize="md"
        className={S.submitButton}
      >
        예약하기
      </Button>
      <div className={S.separator} />
      <section className={classNames(S.total, S.calendarSectionTitle)}>
        <p>총 합계</p>
        <p>{perPersonPrice}</p>
      </section>
    </div>
  );
}
