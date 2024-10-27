import { getActivities, GetActivitiesProps, GetActivitiesResponse } from '@/fetches/activities';
import { useQuery } from '@tanstack/react-query';

export const useActivitiesQuery = (params: GetActivitiesProps, initialActivitiesData?: GetActivitiesResponse) => {
  return useQuery<GetActivitiesResponse, Error>({
    queryKey: ['activities', params],
    queryFn: () => getActivities(params),
    initialData: initialActivitiesData,
  });
};

export const useBestActivitiesQuery = (
  page: number,
  size: number,
  initialBestActivitiesData?: GetActivitiesResponse,
) => {
  return useQuery<GetActivitiesResponse, Error>({
    queryKey: ['bestActivities', page, size],
    queryFn: () =>
      getActivities({
        sort: 'most_reviewed',
        method: 'offset',
        page,
        size,
      }),
    initialData: initialBestActivitiesData,
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
