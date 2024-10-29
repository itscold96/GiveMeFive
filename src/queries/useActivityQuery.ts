import { getActivities, GetActivitiesProps, GetActivitiesResponse } from '@/fetches/activities';
import { useQuery } from '@tanstack/react-query';

export const useActivitiesQuery = (params: GetActivitiesProps, initialActivitiesData?: GetActivitiesResponse) => {
export const useActivitiesQuery = (params: GetActivitiesProps, initialActivitiesData?: GetActivitiesResponse) => {
  return useQuery<GetActivitiesResponse, Error>({
    queryKey: ['activities', params],
    queryFn: () =>
      getActivities({
        ...params,
        // 검색어가 있을 경우 title과 keyword 모두 사용
        ...(params.title && {
          title: params.title,
          keyword: params.title, // 키워드 검색도 같이
        }),
      }),
    initialData: initialActivitiesData,
  });
};

export const useBestActivitiesQuery = (
  page: number,
  size: number,
  initialBestActivitiesData?: GetActivitiesResponse,
) => {
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
