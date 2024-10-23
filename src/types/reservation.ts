import { Time } from './schedule';

export interface Reservation {
  selectedDate: Date;
  selectedTime: Time | null;
  headCount: number;
}

export interface SelectAvailableDateParam {
  date: Date;
  availableDates: string[];
}

export interface ReservationAction {
  setSelectedDate: (date: Date) => void;
  setSelectedTime: (time: Time) => void;
  increaseHeadCount: () => void;
  decreaseHeadCount: () => void;
}

export interface ReservationProps {
  activityId: number;
  price: number;
}

export interface ReservationStore {
  reservation: Reservation;
  action: ReservationAction;
}

export interface ReservationComponentProps {
  activityId: number;
  selectedDate: Date;
  selectedTime: Time | null;
  handleDateSelect: ({ date, availableDates }: { date: Date; availableDates: string[] }) => void;
  handleTimeSelect: (time: Time) => void;
}
