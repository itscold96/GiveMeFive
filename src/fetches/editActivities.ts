import { SubmitActivitiesParams } from '@/types/addActivities';
import { axiosAuth } from './setupAxios';

export const editActivities = async (values: SubmitActivitiesParams, activityId: number) => {
  const { data } = await axiosAuth.patch(`/my-activities/${activityId}`, values);
  return data;
};
