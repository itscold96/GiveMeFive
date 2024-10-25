import { AVAILABLE_SCHEDULE_QUERY_KEY } from '@/constants/queryKeys';
import { submitReservation } from '@/fetches/submitReservation';
import { SubmitReservationParams } from '@/types/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useReservationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ activityId, scheduleId, headCount }: SubmitReservationParams) =>
      submitReservation({ activityId, scheduleId, headCount }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [AVAILABLE_SCHEDULE_QUERY_KEY] }),
  });
};
