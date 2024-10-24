import React, { useState } from 'react';
import S from './ReservationHistoryCard.module.scss';
import Button from '../@shared/button/Button';
import AlertModal from '../../components/@shared/modal/AlertModal';
import { cancelReservation } from '@/fetches/reservationHistory';

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
  reviewSubmitted?: boolean;
}

interface ReservationHistoryCardProps {
  reservation: Reservation;
  onCancelSuccess?: () => void;
}

function ReservationHistoryCard({ reservation, onCancelSuccess }: ReservationHistoryCardProps) {
  const { activity, date, startTime, endTime, headCount, totalPrice, status, reviewSubmitted } = reservation;
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  function getStatusLabel() {
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
  }

  function openAlert() {
    setIsAlertOpen(true);
  }

  function handleCloseAlert() {
    setIsAlertOpen(false);
  }

  async function handleConfirmDelete() {
    try {
      await cancelReservation(reservation.id);
      setIsAlertOpen(false);
      console.log('예약이 취소되었습니다.');
      if (onCancelSuccess) {
        onCancelSuccess();
      }
    } catch (error) {
      console.error('예약 취소 중 오류가 발생했습니다:', error);
    }
  }

  function renderActionButton() {
    if (status === 'completed' && !reviewSubmitted) {
      return (
        <Button
          buttonColor="nomadBlack"
          borderRadius="radius6"
          textSize="md"
          padding="padding8"
          className={S.actionButton}
          onClick={() => {
            console.log('후기 작성 클릭됨');
          }}
        >
          후기 작성
        </Button>
      );
    }
    if (status === 'pending') {
      return (
        <Button
          buttonColor="white"
          borderRadius="radius6"
          textSize="md"
          padding="padding8"
          className={S.actionButton}
          onClick={openAlert}
        >
          예약 취소
        </Button>
      );
    }
    return null;
  }

  return (
    <div className={S.card}>
      <img src={activity.bannerImageUrl} alt={activity.title} className={S.image} />
      <div className={S.info}>
        <div className={`${S.status} ${S[status]}`}>{getStatusLabel()}</div>
        <div className={S.title}>{activity.title}</div>
        <div className={S.details}>
          {date} · {startTime} - {endTime} · {headCount}명
        </div>
        <div className={S.priceAndButton}>
          <div className={S.price}>₩{totalPrice.toLocaleString()}</div>
          <div className={S.buttonContainer}>{renderActionButton()}</div>
        </div>
      </div>

      <AlertModal
        isOpen={isAlertOpen}
        onClose={handleCloseAlert}
        onAlert={handleConfirmDelete}
        message="정말로 취소하시겠습니까?"
        alertButtonText="취소"
      />
    </div>
  );
}

export default ReservationHistoryCard;
