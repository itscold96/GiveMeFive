'use client';

import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import S from './Reservation.module.scss';
import Button from '../@shared/button/Button';
import classNames from 'classnames';
import ReservationSelector from './ReservationSelector';
import HeadCountStepper from './HeadCountStepper';
import { useMediaQuery } from '@mantine/hooks';
import CalendarModal from './CalendarModal';
import { ReservationProps } from '@/types/reservation';
import { useReservationStore } from '@/stores/useReservationStore';

export default function Reservation({ activityId, price }: ReservationProps) {
  const { headCount } = useReservationStore(state => state.reservation);
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

        {isTabletSize ? <CalendarModal activityId={activityId} /> : <ReservationSelector activityId={activityId} />}

        <HeadCountStepper />

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
            <p>{getCurrencyFormat(price * headCount)} 원</p>
          </div>
        </section>
      </div>
    </div>
  );
}
