import { MY_NOTIFICATION_QUERY_KEY } from '@/constants/queryKeys';
import { getNotifications } from '@/fetches/getNotifications';
import { useQuery } from '@tanstack/react-query';

export const useNotification = () => {
  return useQuery({
    queryKey: [MY_NOTIFICATION_QUERY_KEY],
    queryFn: getNotifications,
    retry: 0, // Polling 방식으로 구현할 것이기 때문에 재시도 필요없음
  });
};
