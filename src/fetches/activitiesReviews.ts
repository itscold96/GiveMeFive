import { axiosInstance, axiosAuth } from './setupAxios';

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
  createdAt: string;
  updatedAt: string;
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

export interface PostReviewResponse {
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  reservationId: number;
  teamId: string;
  id: number;
}

export const getActivityReviews = async ({ activityId, page = 1, size = 3 }: GetActivityReviewsProps) => {
  const response = await axiosInstance.get<GetActivityReviewsResponse>(`/activities/${activityId}/reviews`, {
    params: { page, size },
  });
  return response.data;
};

export const postReview = async (
  reservationId: string,
  content: string,
  rating: number,
): Promise<PostReviewResponse> => {
  try {
    const response = await axiosAuth.post<PostReviewResponse>(`/my-reservations/${reservationId}/reviews`, {
      content,
      rating,
    });

    return response.data;
  } catch (error) {
    throw new Error('리뷰 작성에 실패했습니다.');
  }
};
