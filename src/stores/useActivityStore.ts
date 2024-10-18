import { Activity, Activities } from '@/api/activities';
import { create } from 'zustand';

interface ActivityState {
  activities: Activity[];
  cursorId: number | null;
  totalCount: number;
  setActivities: (activities: Activities) => void;
}

export const useActivityStore = create<ActivityState>(set => ({
  activities: [],
  cursorId: null,
  totalCount: 0,
  setActivities: (activitiesData: Activities) =>
    set({
      activities: activitiesData.activities,
      cursorId: activitiesData.cursorId,
      totalCount: activitiesData.totalCount,
    }),
}));
