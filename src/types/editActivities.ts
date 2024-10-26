interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface SubmitEditActivitiesParams {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  schedulesToAdd: Schedule[];
  scheduleIdsToRemove: number[];
  bannerImageUrl: string;
  subImageUrlsToAdd: string[];
  subImageIdsToRemove: number[];
}
