import { USERS_QUERY_KEY } from '@/constants/queryKeys';
import { getAvailableSchedule, GetAvailableScheduleParams } from '@/fetches/getAvailableSchedule';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

interface useAvailableScheduleParams extends GetAvailableScheduleParams {
  date: number;
}

export const useAvailableSchedule = ({ activityId, month, year, date }: useAvailableScheduleParams) => {
  return useQuery({
    // 날짜를 바꾸는 사이에 다른 사람의 예약이 이루어질 수 있으므로
    // 최대한 사용자가 예약하기를 눌렀을 때, 이미 예약된 일정이 되는 것을 피하기 위해
    // 선택된 날짜가 바뀌면 새로 서버에서 데이터를 받아오도록 queryKey에 year, date, month 추가
    // 선택한 체험이 바뀌면 새로 데이터를 불러오도록 activityId도 추가
    queryKey: [USERS_QUERY_KEY, activityId, year, date, month],
    queryFn: () => getAvailableSchedule({ activityId, month, year }),
    // 예약 정보 중복을 피하기 위해 사용자가 날짜를 바꿀 때 마다 데이터를 새로 불러오는데,
    // 이때 컴포넌트의 깜빡임을 없애기 위해, 새로 데이터를 받아오기 전까지 기존 데이터를 유지함
    placeholderData: previousData => previousData,
    select: data => {
      const today = dayjs();
      // 서버에서 받아온 예약 날짜들 중에서 오늘과 그 이후 스케쥴만 뽑아서 전달
      const availableSchedule = data.filter(
        schedule => dayjs(schedule.date).isSame(today, 'day') || dayjs(schedule.date).isAfter(today, 'day'),
      );

      return availableSchedule;
    },
  });
};
