import React from 'react';
import S from './ReservationHistoryCard.module.scss';

interface Reservation {
  id: number;
  activity: {
    title: string;
    bannerImageUrl: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  totalPrice: number;
  status: string;
}

interface ReservationHistoryCardProps {
  reservation: Reservation;
}

function ReservationHistoryCard({ reservation }: ReservationHistoryCardProps) {
  const { activity, date, startTime, endTime, headCount, totalPrice, status } = reservation;

  const getStatusLabel = () => {
    switch (status) {
      case 'pending':
        return '예약 신청';
      case 'confirmed':
        return '예약 승인';
      case 'completed':
        return '체험 완료';
      case 'declined':
        return '예약 거절';
      case 'canceled':
        return '예약 취소';
      default:
        return '예약 신청';
    }
  };

  return (
    <div className={S.card}>
      <img src={activity.bannerImageUrl} alt={activity.title} className={S.image} />
      <div className={S.info}>
        <div className={`${S.status} ${S[status]}`}>{getStatusLabel()}</div>
        <div className={S.title}>{activity.title}</div>
        <div className={S.details}>
          {date} · {startTime} - {endTime} · {headCount}명
        </div>
        <div className={S.price}>₩{totalPrice.toLocaleString()}</div>
      </div>
    </div>
  );
}
export default ReservationHistoryCard;
