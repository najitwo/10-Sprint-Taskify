interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt?: string;
  createdByMe: boolean;
}

interface GetDashboardsRequestParams {
  navigationMethod: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
}

interface GetDashboardsResponse {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: number | null;
}
