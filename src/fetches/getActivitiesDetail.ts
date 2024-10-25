import { axiosInstance } from './setupAxios';

interface SubImage {
  id: number;
  imageUrl: string;
}

interface Schedule {
  id: number;
  date: string; // YYYY-MM-DD 형식
  startTime: string; // HH:mm 형식
  endTime: string; // HH:mm 형식
}
export interface GetActivitiesDetailResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetActivitiesDetailProps {
  activityId: number;
}

export const getActivitiesDetail = async ({ activityId }: GetActivitiesDetailProps) => {
  const response = await axiosInstance.get<GetActivitiesDetailResponse>(`/activities/${activityId}`);
  return response.data;
};
