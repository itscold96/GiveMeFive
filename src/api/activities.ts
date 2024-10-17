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
export interface Activities {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

const getActivities = async ({
  category,
  sort,
  // method: 'offset',
  keyword,
}: {
  category: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
  sort: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
  // method: 'offset' | 'cursor';
  keyword?: string;
}): Promise<Activities> => {
  const response = await axiosInstance.get(`/activities`, {
    params: {
      category,
      sort,
      method: 'offset',
      keyword,
    },
  });
  return response.data;
};

export { getActivities };
