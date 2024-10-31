import dayjs from 'dayjs';
import { getReservedSchedule, GetReservedScheduleResponse } from '@/fetches/getReservationDashboard';
import { useEffect, useState } from 'react';
import S from './ReservationInfoModal.module.scss';
import ReservationInfoTabs from '../ReservationInfoTabs/ReservationInfoTabs';
import deleteXButton from '@/images/delete-X-button.svg';
import Image from 'next/image';

export interface ReservationCount {
  declined: number;
  confirmed: number;
  pending: number;
}

interface ReservationInfoModalProps {
  activityId: number;
  onClose: () => void;
  selectedDate: Date;
  className?: string;
}

export default function ReservationInfoModal({ activityId, onClose, selectedDate }: ReservationInfoModalProps) {
  const [reservationCount, setReservationCount] = useState<ReservationCount>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [isToggleTrigger, setIsToggleTrigger] = useState(false);
  const [scheduleData, setScheduleData] = useState<string[]>();
  const [scheduleKey, setScheduleKey] = useState<number[]>();
  console.log(selectedDate, '선택날짜');
  console.log(scheduleData, scheduleKey);
  const formattedDate = dayjs(new Date(selectedDate)).format('YYYY-MM-DD');
  const fetchReservedSchedule = async () => {
    try {
      const response = await getReservedSchedule({ activityId, formattedDate });
      console.log(response);

      if (Array.isArray(response) && response.length > 0) {
        const formattedScheduleData = response.map(item => {
          const { startTime, endTime } = item;
          return `${startTime} ~ ${endTime}`; // "00:00 ~ 12:00" 형식으로 변환
        });
        const formattedScheduleId = response.map(item => {
          const { scheduleId } = item;
          return scheduleId;
        });
        console.log(formattedScheduleData);
        setScheduleData(formattedScheduleData);
        setScheduleKey(formattedScheduleId);
        if (selectedIndex !== undefined) {
          setReservationCount(response[selectedIndex].count);
        }
      } else {
        console.log('예약된 스케줄이 없습니다.');
      }
    } catch (error) {
      console.error('스케줄 데이터를 가져오는 도중 에러 발생:', error);
    }
  };
  useEffect(() => {
    fetchReservedSchedule();
  }, [selectedDate, selectedIndex]);

  return (
    <div className={S.modalContainer}>
      <div className={S.modalBox}>
        <div className={S.modalTop}>
          <div>예약 정보</div>
          <Image src={deleteXButton} alt="예약 정보 닫기 버튼" width={40} height={40} />
        </div>
        <ReservationInfoTabs
          reservationCount={reservationCount}
          onClose={onClose}
          activityId={activityId}
          selectedDate={selectedDate}
          setIsToggleTrigger={setIsToggleTrigger}
          isToggleTrigger={isToggleTrigger}
          scheduleData={scheduleData}
          scheduleKey={scheduleKey}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
    </div>
  );
}
