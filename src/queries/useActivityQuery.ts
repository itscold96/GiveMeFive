import { getActivities, GetActivitiesProps, GetActivitiesResponse } from '@/fetches/activities';
import { useQuery } from '@tanstack/react-query';

export const useActivitiesQuery = (params: GetActivitiesProps) => {
  return useQuery<GetActivitiesResponse, Error>({
    queryKey: ['activities', params],
    queryFn: () => getActivities(params),
  });
};

export const useBestActivitiesQuery = (page: number) => {
  return useQuery<GetActivitiesResponse, Error>({
    queryKey: ['bestActivities', page],
    queryFn: () =>
      getActivities({
        sort: 'most_reviewed',
        method: 'offset',
        page,
        size: 3,
      }),
  });
};

export const useSearchActivitiesQuery = (searchTerm: string, page: number, size: number) => {
  return useQuery<GetActivitiesResponse, Error>({
    queryKey: ['searchActivities', searchTerm, page, size],
    queryFn: () =>
      getActivities({
        title: searchTerm,
        sort: 'latest',
        method: 'offset',
        page,
        size,
      }),
    enabled: !!searchTerm,
  });
};
