export interface Notification {
  id: number;
  teamId: string;
  userId: 0;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface GetNotificationReturn {
  cursorId: number | null;
  notifications: Notification[];
  totalCount: number;
}
