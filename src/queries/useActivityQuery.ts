import { getActivities, GetActivitiesProps, GetActivitiesResponse } from '@/fetches/activities';
import { useQuery } from '@tanstack/react-query';

export const useActivitiesQuery = (params: GetActivitiesProps, initialActivitiesData?: GetActivitiesResponse) => {
  const queryParams = {
    category: params.category ?? undefined,
    sort: params.sort as 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest',
    size: params.size,
    method: 'offset' as 'offset' | 'cursor',
    page: params.page,
    // 검색어가 있을 경우 title과 keyword 모두 설정
    ...(params.title && {
      title: params.title,
      keyword: params.title,
    }),
  };

  return useQuery<GetActivitiesResponse, Error>({
    queryKey: ['activities', queryParams],
    queryFn: () => getActivities(queryParams),
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
