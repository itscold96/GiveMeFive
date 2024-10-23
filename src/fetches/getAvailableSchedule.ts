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
  // 서버에서 month를 MM 형식으로만 받음
  const formattedMonth = month < 10 ? `0${month}` : month;
  const { data } = await axiosAuth(`activities/${activityId}/available-schedule`, {
    params: { year, month: formattedMonth },
  });
  return data;
};
