import { axiosAuth } from './setupAxios';

export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: number;
  status: 'pending' | 'completed' | 'declined' | 'canceled' | 'confirmed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyReservationsResponse {
  cursorId?: number | null;
  totalCount: number;
  reservations: Reservation[];
}

export interface GetMyReservationsProps {
  page?: number;
  size?: number;
  sort?: 'latest' | 'earliest';
}

// 예약 목록 조회 함수
export const getMyReservations = async (params: GetMyReservationsProps) => {
  const response = await axiosAuth.get<GetMyReservationsResponse>('/my-reservations', {
    params: {
      ...params,
      method: 'offset',
    },
  });
  return response.data;
};

// 예약 취소 함수
export const cancelReservation = async (id: number) => {
  const response = await axiosAuth.patch(`/my-reservations/${id}`, {
    status: 'canceled',
  });
  return response.data;
};
