import { Activity, getActivities, GetActivitiesProps, GetActivitiesResponse } from '@/api/activities';
import { create } from 'zustand';

interface ActivityState {
  activitiesResponse: GetActivitiesResponse;
  bestActivitiesResponse: GetActivitiesResponse;
  firstBestActivity: Activity | null;

  getActivities: (param: GetActivitiesProps) => Promise<void>;
  getBestActivities: (cursorId: number | null) => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activitiesResponse: {
    totalCount: 0,
    activities: [],
  },

  bestActivitiesResponse: {
    cursorId: null,
    totalCount: 0,
    activities: [],
  },

  firstBestActivity: null,

  getActivities: async (param: GetActivitiesProps) => {
    const response: GetActivitiesResponse = await getActivities(param);
    set({ activitiesResponse: response });
  },

  getBestActivities: async (cursorId: number | null) => {
    const response: GetActivitiesResponse = await getActivities({
      sort: 'most_reviewed',
      method: 'cursor',
      cursorId,
      size: 3,
    });
    if (response.cursorId !== null) {
      set({ bestActivitiesResponse: response });
    } else {
      const response: GetActivitiesResponse = await getActivities({
        sort: 'most_reviewed',
        method: 'cursor',
        cursorId: null,
        size: 3,
      });
      set({ bestActivitiesResponse: response });
    }
    if (!get().firstBestActivity) {
      set({ firstBestActivity: response.activities[0] });
    }
  },
}));
