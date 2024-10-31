import { getActivities, GetActivitiesResponse } from '@/fetches/activities';
import { useQuery } from '@tanstack/react-query';

interface ActivityQueryParams {
  category?: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
  sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
  size: number;
  page: number;
  title?: string;
}

export const useActivitiesQuery = (params: ActivityQueryParams, initialActivitiesData?: GetActivitiesResponse) => {
  const queryParams = {
    category: params.category,
    sort: params.sort,
    size: params.size,
    method: 'offset' as const,
    page: params.page,
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
