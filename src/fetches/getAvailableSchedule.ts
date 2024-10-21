import { Schedule } from '@/types/schedule';
import { axiosAuth } from './setupAxios';

export interface GetAvailableScheduleParams {
  activityId: number;
  year: number;
  month: number;
}

export const getAvailableSchedule = async ({
  activityId,
  year,
  month,
}: GetAvailableScheduleParams): Promise<Schedule[]> => {
  const { data } = await axiosAuth(`activities/${activityId}/available-schedule`, { params: { year, month } });
  return data;
};
