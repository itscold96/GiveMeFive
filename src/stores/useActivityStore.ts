import { getActivities, GetActivitiesProps, Activity, GetActivitiesResponse } from '@/api/activities';
import { create } from 'zustand';

interface ActivityState {
  activities: Activity[];
  totalCount: number;
  bestActivities: Activity[];

  getActivities: (param: GetActivitiesProps) => Promise<void>;
  getBestActivities: () => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],
  totalCount: 0,

  bestActivities: [],

  getActivities: async (param: GetActivitiesProps) => {
    const response: GetActivitiesResponse = await getActivities(param);
    set({ ...response });
  },

  getBestActivities: async () => {
    const response: GetActivitiesResponse = await getActivities({
      sort: 'most_reviewed',
      method: 'offset',
      page: 1,
      size: 3,
    });
    set({ bestActivities: response.activities });
  },
}));
