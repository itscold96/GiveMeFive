'use client';

import { useReservationStore } from '@/stores/useReservationStore';
import { ReservationProps } from '@/types/reservation';
import { useMediaQuery } from '@mantine/hooks';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// useMediaQuery 특성상, SSR 시에는 undefined, hydration 시에 boolean 값이 부여되는데,
// 이렇게 되면 모바일 환경에서 접속 시, PC 화면의 컴포넌트가 잠깐 렌더링되었다가 모바일로 바뀌게 된다.
// 이러한 경험은 사용자에게 좋지 않으므로, dynamic import로 SSR시에는 렌더링 되지 않도록 처리했다.
const MobileReservation = dynamic(() => import('@/app/components/reservation/MobileReservation'), { ssr: false });
const Reservation = dynamic(() => import('@/app/components/reservation/Reservation'), { ssr: false });

export default function ResponsiveReservation({ activityId, price }: ReservationProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { reset } = useReservationStore(state => state.action);

  useEffect(() => {
    // zustand의 전역 스토어가 유지됨으로 인해,
    // 예약 컴포넌트가 언마운트된 이후에도 이전 예약 데이터가 유지되어
    // 다른 체험의 예약 컴포넌트에 이전 체험 데이터가 영향을 미치는 것을 발견.
    // 예약 컴포넌트가 언마운트될 때, 예약 데이터를 초기화 하는 작업 실행
    return () => {
      reset();
    };
  }, []);

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
