import { MY_NOTIFICATION_QUERY_KEY } from '@/constants/queryKeys';
import { deleteNotifications } from '@/fetches/deleteNotifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useNotificationDelete = (notificationId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteNotifications(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MY_NOTIFICATION_QUERY_KEY] });
    },
  });
};
