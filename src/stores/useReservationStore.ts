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
    setSelectedDate: date => {
      set(prevState => ({ reservation: { ...prevState.reservation, selectedDate: date, selectedTime: null } }));
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
    reset: () => {
      set({ reservation: initialReservation });
    },
  },
}));
