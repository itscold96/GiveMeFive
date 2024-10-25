import { axiosInstance } from './setupAxios';

export interface Reviewer {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface Review {
  id: number;
  user: Reviewer;
  activityId: number;
  rating: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetActivityReviewsResponse {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

export interface GetActivityReviewsProps {
  activityId: number;
  page?: number;
  size?: number;
}

export const getActivityReviews = async ({ activityId, page = 1, size = 3 }: GetActivityReviewsProps) => {
  const response = await axiosInstance.get<GetActivityReviewsResponse>(`/activities/${activityId}/reviews`, {
    params: { page, size },
  });
  return response.data;
};
