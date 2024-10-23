import { useReservationMutation } from '@/queries/useReservationsMutation';
import { useReservationStore } from '@/stores/useReservationStore';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useToggle } from './useToggle';

// PC, Tablet과 모바일의 컴포넌트 디자인이 서로 다르기에
// 다른 컴포넌트를 사용해야하므로 중복되는 예약 제출 로직을 모듈화
export const useReservationSubmit = (activityId: number) => {
  const { headCount, selectedTime } = useReservationStore(state => state.reservation);
  const [modalMessage, setModalMessage] = useState('');
  const { toggleValue: isModalOpen, toggleDispatch: modalToggle } = useToggle();
  const { mutateAsync } = useReservationMutation(); // 성공, 실패에 따라 다른 modal 창을 열어야 하므로 비동기 처리가 필요함

  const handleReservationSubmit = async () => {
    if (selectedTime) {
      try {
        await mutateAsync({ activityId, headCount, scheduleId: selectedTime.id });
        setModalMessage('예약이 완료되었습니다');
      } catch (error) {
        if (error instanceof AxiosError) {
          setModalMessage(error.response?.data.message);
        }
      } finally {
        modalToggle({ type: 'on' });
      }
    } else {
      setModalMessage('예약 시간을 선택해주세요');
      modalToggle({ type: 'on' });
    }
  };

  return {
    modalMessage,
    isModalOpen,
    handleReservationSubmit,
    modalToggle,
  };
};
