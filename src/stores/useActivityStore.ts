import { getActivities, GetActivitiesProps, Activity, GetActivitiesResponse } from '@/api/activities';
import { create } from 'zustand';

interface ActivityState {
  activities: Activity[];
  bestActivities: Activity[];
  cursorId: number | null;
  totalCount: number;
  getActivities: (param: GetActivitiesProps) => Promise<void>;
  getBestActivities: () => Promise<void>;
}

export const useActivityStore = create<ActivityState>(set => ({
  activities: [],
  bestActivities: [],
  cursorId: null,
  totalCount: 0,
  getActivities: async (param: GetActivitiesProps) => {
    const response: GetActivitiesResponse = await getActivities(param);
    set({ ...response });
  },
  getBestActivities: async () => {
    const response: GetActivitiesResponse = await getActivities({
      sort: 'most_reviewed',
      method: 'cursor',
      cursorId: null,
      size: 3,
    });
    set({ bestActivities: response.activities });
  },
}));
