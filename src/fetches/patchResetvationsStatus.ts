import { axiosAuth } from './setupAxios';

interface PatchReservattionsStatusProps {
  activityId: number;
  reservationId: number;
  status: string;
}
interface PatchReservationsStatusResponse {
  status: string;
}
export const patchReservatonsStatus = async ({
  activityId,
  reservationId,
  status,
}: PatchReservattionsStatusProps): Promise<PatchReservationsStatusResponse> => {
  const response = await axiosAuth.patch<PatchReservationsStatusResponse>(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    { status },
  );
  return response.data;
};
