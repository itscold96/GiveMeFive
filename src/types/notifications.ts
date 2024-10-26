export interface Notification {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface GetNotificationReturn {
  cursorId: number | null;
  notifications: Notification[];
  totalCount: number;
}
