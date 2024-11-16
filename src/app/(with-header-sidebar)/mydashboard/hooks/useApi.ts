import { useState, useEffect, useCallback } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import axiosInstance from '../utils/axiosInstance';

type UseApiFetchReturnType<T> = {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  refetch: () => Promise<void>;
};

type RequestOptions<
  TParams = Record<string, unknown>,
  TBody = Record<string, unknown>,
> = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: TParams;
  body?: TBody;
};

export default function useApi<
  T,
  TParams = Record<string, unknown>,
  TBody = Record<string, unknown>,
>(
  url: string,
  options: RequestOptions<TParams, TBody>
): UseApiFetchReturnType<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const config = {
        method: options.method,
        url,
        params: options.params,
        data: options.body,
      };
      const response: AxiosResponse<T> = await axiosInstance.request(config);
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
