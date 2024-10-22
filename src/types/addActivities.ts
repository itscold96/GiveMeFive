interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface SubmitActivitiesParams {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
}
