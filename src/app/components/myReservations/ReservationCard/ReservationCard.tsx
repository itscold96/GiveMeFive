import { patchReservatonsStatus } from '@/fetches/patchResetvationsStatus';
import Button from '../../@shared/button/Button';
import S from './ReservationCard.module.scss';

interface Reservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

interface ReservationCardProps {
  reservation: Reservation;
  setIsToggleTrigger?: (value: boolean) => void;
  isToggleTrigger?: boolean;
}

function ReservationCard({ reservation, setIsToggleTrigger, isToggleTrigger }: ReservationCardProps) {
  const onClickConfirmed = async () => {
    const activityId = reservation.activityId;
    const reservationId = reservation.id;
    const status = 'confirmed';
    const response = await patchReservatonsStatus({ activityId, reservationId, status });
    setIsToggleTrigger?.(!isToggleTrigger);
  };
  const onClickDeclined = async () => {
    const activityId = reservation.activityId;
    const reservationId = reservation.id;
    const status = 'declined';
    const response = await patchReservatonsStatus({ activityId, reservationId, status });
    setIsToggleTrigger?.(!isToggleTrigger);
  };
  return (
    <div className={S.cardContainer}>
      <div className={S.cardContainerInfoBox}>
        <div className={S.infoText}>
          <div className={S.infoHead}>닉네임</div>
          <div className={S.infoBody}>{reservation.nickname}</div>
        </div>
        <div className={S.infoText}>
          <div className={S.infoHead}>인원</div>
          <div className={S.infoBody}>{reservation.headCount}명</div>
        </div>
      </div>
      <div className={S.buttonContainer}>
        {reservation.status === 'pending' && (
          <>
            <Button
              buttonColor="nomadBlack"
              borderRadius="radius6"
              textSize="md"
              padding="padding8"
              onClick={onClickConfirmed}
            >
              승인하기
            </Button>
            <Button
              buttonColor="white"
              borderRadius="radius6"
              textSize="md"
              padding="padding8"
              onClick={onClickDeclined}
            >
              거절하기
            </Button>
          </>
        )}
        {reservation.status === 'confirmed' && <div className={S.confirmed}>예약 승인</div>}
        {reservation.status === 'declined' && <div className={S.declined}>예약 거절</div>}
      </div>
    </div>
  );
}

export default ReservationCard;
