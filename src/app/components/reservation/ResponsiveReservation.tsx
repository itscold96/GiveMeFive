'use client';

import { ReservationProps } from '@/types/reservation';
import { useMediaQuery } from '@mantine/hooks';
import MobileReservation from './MobileReservation';
import Reservation from './Reservation';

export default function ResponsiveReservation({ activityId, price }: ReservationProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {isMobile ? (
        <MobileReservation activityId={activityId} price={price} />
      ) : (
        <Reservation activityId={activityId} price={price} />
      )}
    </>
  );
}
