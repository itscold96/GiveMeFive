import { Time } from './schedule';

export interface ReservationComponentProps {
  activityId: number;
  selectedDate: Date;
  selectedTime: Time | null;
  handleDateSelect: ({ date, availableDates }: { date: Date; availableDates: string[] }) => void;
  handleTimeSelect: (time: Time) => void;
}
