export interface ReservationCalendarProps {
  activityId: number;
  selectedDate: Date;
  selectedTimeId: number | null;
  handleDateSelect: ({ date, availableDates }: { date: Date; availableDates: string[] }) => void;
  handleTimeSelect: (id: number) => void;
}
