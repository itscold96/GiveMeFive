'use client';

import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import S from './Reservation.module.scss';
import Button from '../@shared/button/Button';
import classNames from 'classnames';
import ReservationSelector from './ReservationSelector';
import HeadCountStepper from './HeadCountStepper';
import { useMediaQuery } from '@mantine/hooks';
import CalendarModal from './CalendarModal';
import { useReservation } from '@/hooks/useReservation';
import { ReservationProps } from '@/types/reservation';

export default function Reservation({ activityId, price }: ReservationProps) {
  const {
    selectedDate,
    selectedTime,
    headCount,
    handleDateSelect,
    handleTimeSelect,
    handleIncreaseHeadCountClick,
    handleDecreaseHeadCountClick,
  } = useReservation();

  const isTabletSize = useMediaQuery('(max-width: 1200px)');
  const perPersonPrice = `₩ ${getCurrencyFormat(price)}`;

  return (
    <div style={{}}>
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
    </div>
  );
}
