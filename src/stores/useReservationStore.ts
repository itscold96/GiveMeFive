import { ReservationStore } from '@/types/reservation';
import dayjs from 'dayjs';
import { create } from 'zustand';

const initialReservation = {
  selectedDate: dayjs().toDate(),
  selectedTime: null,
  headCount: 1,
};

export const useReservationStore = create<ReservationStore>(set => ({
  reservation: initialReservation,
  action: {
    setSelectedDate: ({ date, availableDates }) => {
      set(prevState => {
        if (availableDates?.includes(dayjs(date).format('YYYY-MM-DD'))) {
          // 예약 가능일일 때만 선택 가능하게 설정, 날짜 바꾸면 기존 선택된 예약 시간 초기화
          return { reservation: { ...prevState.reservation, selectedDate: date, selectedTime: null } };
        }
        return { reservation: prevState.reservation };
      });
    },
    setSelectedTime: time => {
      set(prevState => ({ reservation: { ...prevState.reservation, selectedTime: time } }));
    },
    increaseHeadCount: () => {
      set(prevState => ({ reservation: { ...prevState.reservation, headCount: prevState.reservation.headCount + 1 } }));
    },
    decreaseHeadCount: () => {
      set(prevState => ({
        reservation: { ...prevState.reservation, headCount: Math.max(prevState.reservation.headCount - 1, 1) },
      }));
    },
  },
}));
