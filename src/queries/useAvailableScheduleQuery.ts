import { USERS_QUERY_KEY } from '@/constants/queryKeys';
import { getAvailableSchedule, GetAvailableScheduleParams } from '@/fetches/getAvailableSchedule';
import { useQuery } from '@tanstack/react-query';

interface useAvailableScheduleParams extends GetAvailableScheduleParams {
  date: number;
}

export const useAvailableSchedule = ({ activityId, month, year, date }: useAvailableScheduleParams) => {
  return useQuery({
    // 날짜를 바꾸는 사이에 다른 사람의 예약이 이루어질 수 있으므로
    // 최대한 사용자가 예약하기를 눌렀을 때, 이미 예약된 일정이 되는 것을 피하기 위해
    // 선택된 날짜가 바뀌면 새로 서버에서 데이터를 받아오도록 queryKey에 date 추가
    queryKey: [USERS_QUERY_KEY, date],
    queryFn: () => getAvailableSchedule({ activityId, month, year }),
  });
};