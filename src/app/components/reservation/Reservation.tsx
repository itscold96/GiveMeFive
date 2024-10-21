'use client';

import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import S from './Reservation.module.scss';
import Button from '../@shared/button/Button';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import { useState } from 'react';
import classNames from 'classnames';
import { useAvailableSchedule } from '@/queries/useAvailableScheduleQuery';
import addIcon from '@/images/icons/icon-add.svg';
import subtractIcon from '@/images/icons/icon-subtract.svg';
import Image from 'next/image';

interface ReservationProps {
  price: number;
}

// 2962: 테스트용 체험 id

export default function Reservation({ price }: ReservationProps) {
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [headCount, setHeadCount] = useState(1);
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1; // 달이 0부터 시작함
  const date = selectedDate.getDate();

  const { data: schedule } = useAvailableSchedule({ activityId: 2962, year, month, date });
  const availableDates = schedule?.map(schedule => schedule.date) || []; // 예약 가능일자 배열

  const availableTimesOfSelectedDate =
    schedule
      ?.filter(schedule => schedule.date === dayjs(selectedDate).format('YYYY-MM-DD')) // 스케쥴 배열에서 선택된 날짜에 맞는 스케쥴만 필터링한 뒤, times 프로퍼티의 값만 걸러낸다.
      .map(schedule => schedule.times) // times가 배열이라 times끼리 모으면 2차원 배열이되므로 flat으로 한 겹 벗겨내어 1차원 객체 배열로 만들어준다.
      .flat() || [];

  const perPersonPrice = `₩ ${getCurrencyFormat(price)}`;

  const handleDateSelect = (date: Date) => {
    if (availableDates?.includes(dayjs(date).format('YYYY-MM-DD'))) {
      setSelectedDate(date); // 예약 가능일일 때만 선택 가능하게 설정
      setSelectedTimeId(null); // 날짜 바꾸면 기존 선택된 예약 시간 초기화
    }
  };

  const handleTimeSelect = (id: number) => {
    setSelectedTimeId(id);
  };

  const handleSubtractHeadCountClick = () => {
    setHeadCount(prevState => Math.max(prevState - 1, 1));
  };

  const handleIncreaseHeadCountClick = () => {
    setHeadCount(prevState => prevState + 1);
  };

  const getDayProps = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const isAvailable = availableDates?.includes(formattedDate); // 해당 날짜가 선택 가능한 날짜 배열에 있는 지 검사
    const isSelected = dayjs(selectedDate).isSame(dayjs(date), 'day');

    return {
      selected: isSelected,
      onClick: () => handleDateSelect(date),
      className: classNames({ [S.availableDates]: isAvailable }), // 예약 가능 일에 스타일 부여
      disabled: !isAvailable, // 예약 가능일이 아니면 선택 불가
    };
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

      <section className={S.headCountContainer}>
        <p className={S.sectionTitle}>참여 인원수</p>
        <div className={S.headCountStepper}>
          <button onClick={handleSubtractHeadCountClick}>
            <Image src={subtractIcon} alt="인원수 감소 버튼" height={20} width={20} />
          </button>
          <p>{headCount}</p>
          <button onClick={handleIncreaseHeadCountClick}>
            <Image src={addIcon} alt="인원수 증가 버튼" height={20} width={20} />
          </button>
        </div>
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
