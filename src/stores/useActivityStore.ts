import { Activity, GetActivitiesResponse } from '@/api/activities';
import { create } from 'zustand';

interface ActivityState {
  activities: Activity[];
  bestActivities: Activity[];
  cursorId: number | null;
  totalCount: number;
  setActivities: (activities: GetActivitiesResponse) => void;
  setBestActivities: (activities: Activity[]) => void;
}

export const useActivityStore = create<ActivityState>(set => ({
  activities: [],
  bestActivities: [],
  cursorId: null,
  totalCount: 0,
  setActivities: (activitiesData: GetActivitiesResponse) => set(activitiesData),
  setBestActivities: (activities: Activity[]) => set({ bestActivities: activities }),
}));
