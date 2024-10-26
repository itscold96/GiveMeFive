export interface Time {
  id: number;
  startTime: string;
  endTime: string;
}

export interface Schedule {
  date: string;
  times: Time[];
}
