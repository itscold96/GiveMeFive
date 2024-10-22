'use client';

import { useMediaQuery } from '@mantine/hooks';
import MobileReservation from '../components/reservation/MobileReservation';
import Reservation from '../components/reservation/Reservation';

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div>
      {/* TODO: 컴포넌트 테스트용이므로 PR 올리기 전에 삭제해야 함 */}
      {isMobile ? <MobileReservation activityId={2962} price={1000} /> : <Reservation activityId={2962} price={1000} />}
    </div>
  );
}
