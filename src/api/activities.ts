import { axiosInstance } from './axiosInstance';

export interface Activity {
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
  createdAt: Date;
  updatedAt: Date;
}
export interface GetActivitiesResponse {
  cursorId: number | null;
  totalCount: number;
  method: 'offset' | 'cursor';
  activities: Activity[];
}

interface GetActivitiesProps {
  category?: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
  sort: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
  method: 'offset' | 'cursor';
  cursorId: number | null;
  limit: number;
  keyword?: string;
}

const getActivities = async (option: GetActivitiesProps) => {
  const response = await axiosInstance.get<GetActivitiesResponse>(`/activities`, {
    params: option,
  });
  return response.data;
};

export { getActivities };
