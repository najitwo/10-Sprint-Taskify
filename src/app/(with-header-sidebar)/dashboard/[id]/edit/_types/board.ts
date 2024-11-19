export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt?: string;
  createdByMe: boolean;
}

export interface UpdateDashboardRequestParams {
  title: string;
  color: string;
}
