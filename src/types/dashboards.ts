export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt?: string;
  createdByMe: boolean;
}

export interface GetDashboardsRequestParams {
  navigationMethod: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
}

export interface GetDashboardsResponse {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: number | null;
}

export interface UpdateDashboardRequestParams {
  title: string;
  color: string;
}

export interface CreateDashboardRequestBody {
  title: string;
  color: string;
}
