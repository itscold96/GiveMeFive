import { axiosAuth } from './setupAxios';

export interface MyActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyActivitiesResponse {
  cursorId?: number | null;
  totalCount: number;
  activities: MyActivity[];
}

export interface GetMyActivitiesProps {
  cursorId?: number | null;
  size?: number;
  sort?: 'latest' | 'most_reviewed';
  category?: string;
}

export const getMyActivities = async (params: GetMyActivitiesProps) => {
  const response = await axiosAuth.get<GetMyActivitiesResponse>('/my-activities', {
    params: {
      ...params,
      method: 'cursor',
    },
  });
  return response.data;
};

export const deleteMyActivity = async (id: number) => {
  const response = await axiosAuth.delete(`/my-activities/${id}`);
  return response.data;
};
