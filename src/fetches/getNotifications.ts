import { GetNotificationReturn } from '@/types/notifications';
import { axiosAuth } from './setupAxios';

const NOTIFICATION_FETCH_SIZE = 100;

export const getNotifications = async (): Promise<GetNotificationReturn> => {
  const { data } = await axiosAuth(`my-notifications?size=${NOTIFICATION_FETCH_SIZE}`);
  return data;
};
