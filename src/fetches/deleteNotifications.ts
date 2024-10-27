import { axiosAuth } from './setupAxios';

export const deleteNotifications = async (notificationId: number) => {
  const { data } = await axiosAuth.delete(`my-notifications/${notificationId}`);
  return data;
};
