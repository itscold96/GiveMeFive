'use client';

import { ReservationProps } from '@/types/reservation';
import { useMediaQuery } from '@mantine/hooks';
import dynamic from 'next/dynamic';

// useMediaQuery 특성상, SSR 시에는 undefined, hydration 시에 boolean 값이 부여되는데,
// 이렇게 되면 모바일 환경에서 접속 시, PC 화면의 컴포넌트가 잠깐 렌더링되었다가 모바일로 바뀌게 된다.
// 이러한 경험은 사용자에게 좋지 않으므로, dynamic import로 SSR시에는 렌더링 되지 않도록 처리했다.
const MobileReservation = dynamic(() => import('@/app/components/reservation/MobileReservation'), { ssr: false });
const Reservation = dynamic(() => import('@/app/components/reservation/Reservation'), { ssr: false });

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
