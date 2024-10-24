import { useQuery } from '@tanstack/react-query';
import { getMyActivities, GetMyActivitiesProps, GetMyActivitiesResponse } from '@/fetches/myActivities';

export const useMyActivitiesQuery = (params: GetMyActivitiesProps) => {
  return useQuery<GetMyActivitiesResponse, Error>({
    queryKey: ['myActivities', params],
    queryFn: () => getMyActivities(params),
  });
};
