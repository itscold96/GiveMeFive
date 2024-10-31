import { axiosAuth } from './setupAxios';

export interface ReservationCounts {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface ReservationData {
  date: string;
  reservations: ReservationCounts;
}

export interface GetReservationDashboardResponse {
  data: ReservationData[];
}

export interface GetReservationDashboardProps {
  activityId?: number;
  year?: number;
  month?: number;
}

// 내 체험 예약 달력 데이터를 가져오는 함수
export const getReservationDashboard = async ({
  activityId,
  year,
  month,
}: GetReservationDashboardProps): Promise<GetReservationDashboardResponse> => {
  // TODO: 임시로 11월로 고정 추후 수정
  const response = await axiosAuth.get<GetReservationDashboardResponse>(
    `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
  );

  return response.data;
};

export interface ReservedScheduleCounts {
  declined: number;
  confirmed: number;
  pending: number;
}

export interface ReservedScheduleData {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ReservedScheduleCounts;
}

export interface GetReservedScheduleResponse {
  data: ReservedScheduleData[];
}

export interface GetReservedScheduleProps {
  activityId: number;
  formattedDate: string;
}

// 내 체험 예약 특정 날짜 스케쥴 데이터를 가져오는 함수
export const getReservedSchedule = async ({
  activityId,
  formattedDate,
}: GetReservedScheduleProps): Promise<GetReservedScheduleResponse> => {
  const response = await axiosAuth.get<GetReservedScheduleResponse>(
    `/my-activities/${activityId}/reserved-schedule?date=${formattedDate}`,
  );

  return response.data;
};

export interface Reservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetReservedSelectScheduleResponse {
  cursorId: number;
  totalCount: number;
  reservations: Reservation[];
}

export interface GetReservedSelectScheduleProps {
  activityId: number;
  selectScheduleId: number;
  selectStatus: 'declined' | 'pending' | 'confirmed';
}

// 내 체험 예약 시간대별 예약 내역 조회
export const getReservedSelectSchedule = async ({
  activityId,
  selectScheduleId,
  selectStatus,
}: GetReservedSelectScheduleProps): Promise<GetReservedSelectScheduleResponse> => {
  const response = await axiosAuth.get<GetReservedSelectScheduleResponse>(
    `/my-activities/${activityId}/reservations?size=10&scheduleId=${selectScheduleId}&status=${selectStatus}`,
  );

  return response.data;
};
