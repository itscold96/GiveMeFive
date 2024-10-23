import { getActivityId, GetActivityIdResponse } from '@/fetches/activities';
import { getActivityReviews, GetActivityReviewsResponse } from '@/fetches/activitiesReviews';

import { useQuery } from '@tanstack/react-query';

export const useDetailActivitiesQuery = (id: number) => {
  return useQuery<GetActivityIdResponse, Error>({
    queryKey: ['activity', id],
    queryFn: () => getActivityId({ id }),
  });
};

export const useActivityReviewsQuery = (activityId: number) => {
  return useQuery<GetActivityReviewsResponse, Error>({
    queryKey: ['activityReviews', activityId],
    queryFn: () => getActivityReviews({ activityId }),
  });
};
