import { SubmitReservationParams } from '@/types/reservation';
import { axiosAuth } from './setupAxios';

export const submitReservation = async ({ activityId, scheduleId, headCount }: SubmitReservationParams) => {
  const { data } = await axiosAuth.post(`activities/${activityId}/reservations`, {
    scheduleId,
    headCount,
  });

  return data;
};
