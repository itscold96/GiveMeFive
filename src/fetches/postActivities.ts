import { SubmitActivitiesParams } from '@/types/addActivities';
import { axiosAuth } from './setupAxios';

export const postActivities = async (values: SubmitActivitiesParams) => {
  const { data } = await axiosAuth.post('/activities', values);
  return data;
};
