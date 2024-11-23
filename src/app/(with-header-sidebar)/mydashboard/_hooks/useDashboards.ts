import { useState } from 'react';
import useApi from '@/app/(with-header-sidebar)/mydashboard/_hooks/useApi';
import type { GetDashboardsResponse } from '@/types/dashboards';

interface UseDashboardsParams {
  pageSize: number;
}

export default function useDashboards({ pageSize }: UseDashboardsParams) {
  const [page, setPage] = useState(1);
  const { data } = useApi<GetDashboardsResponse>('/dashboards', {
    method: 'GET',
    params: { navigationMethod: 'pagination', page, size: pageSize },
  });

  const dashboards = data?.dashboards ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (direction: 'next' | 'prev') => {
    setPage((prevPage) => {
      if (direction === 'next' && prevPage < totalPages) return prevPage + 1;
      if (direction === 'prev' && prevPage > 1) return prevPage - 1;
      return prevPage;
    });
  };

  return { page, dashboards, totalPages, handlePageChange };
}
