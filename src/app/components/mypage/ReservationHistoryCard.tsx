import React, { useState } from 'react';
import S from './ReservationHistoryCard.module.scss';
import Button from '../@shared/button/Button';
import AlertModal from '../../components/@shared/modal/AlertModal';
import Modal from '../../components/@shared/modal/Modal';
import { cancelReservation } from '@/fetches/reservationHistory';
import Link from 'next/link';
import WriteReview from './WriteReview';

interface Reservation {
  id: number;
  activity: {
    id: number;
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
  onReviewSubmitted?: (reservationId: number) => void;
}

function ReservationHistoryCard({ reservation, onCancelSuccess, onReviewSubmitted }: ReservationHistoryCardProps) {
  const { activity, date, startTime, endTime, headCount, totalPrice } = reservation;
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(reservation.status); // 상태 관리

  function getStatusLabel() {
    switch (currentStatus) {
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
      console.log('예약이 취소되었습니다.');
      setCurrentStatus('canceled'); // 상태 업데이트
      if (onCancelSuccess) {
        onCancelSuccess(); // 취소 성공 콜백 호출
      }
      handleCloseAlert(); // 모달 닫기
    } catch (error) {
      console.error('예약 취소 중 오류가 발생했습니다:', error);
    }
  }

  function openReviewModal() {
    setIsReviewModalOpen(true);
  }

  function closeReviewModal() {
    setIsReviewModalOpen(false);
  }

  function renderActionButton() {
    if (currentStatus === 'completed' && !reservation.reviewSubmitted) {
      return (
        <Button
          buttonColor="nomadBlack"
          borderRadius="radius6"
          textSize="md"
          padding="padding8"
          className={S.actionButton}
          onClick={openReviewModal}
        >
          후기 작성
        </Button>
      );
    }
    if (currentStatus === 'pending') {
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
        <div className={`${S.status} ${S[currentStatus]}`}>{getStatusLabel()}</div>
        <Link href={`/activities/${activity.id}`} className={S.title}>
          {activity.title}
        </Link>
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

      <Modal isOpen={isReviewModalOpen} onClose={closeReviewModal}>
        <WriteReview
          teamId={activity.id.toString()}
          reservationId={reservation.id.toString()}
          bannerImageUrl={activity.bannerImageUrl}
          title={activity.title}
          date={date}
          startTime={startTime}
          endTime={endTime}
          headCount={headCount}
          totalPrice={totalPrice}
          onClose={closeReviewModal}
          onReviewSubmitted={() => {
            closeReviewModal();
            if (onReviewSubmitted) {
              onReviewSubmitted(reservation.id); // 리뷰가 제출된 예약 ID를 전달
            }
          }}
        />
      </Modal>
    </div>
  );
}

export default ReservationHistoryCard;
