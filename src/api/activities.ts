import { axiosInstance } from './axiosInstance';

export type Activities = {
  cursorId: number;
  totalCount: number;
  activities: {
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
  }[];
};

export const getActivities = async (): Promise<Activities> => {
  const response = await axiosInstance.get('/activities');
  return response.data;
};
