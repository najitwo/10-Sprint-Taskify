import { useState, useEffect, useCallback } from 'react';
import { Column } from '@/types/dashboardView';
import { getColumns } from '@/lib/columnService';

const useColumn = (dashboardId: number | null) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleLoad = useCallback(async (dashboardId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getColumns(dashboardId);
      setColumns(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setColumns([]);
    if (dashboardId) {
      handleLoad(dashboardId);
    }
  }, [handleLoad, dashboardId]);

  return {
    columns,
    isLoading,
    error,
  };
};

export default useColumn;
