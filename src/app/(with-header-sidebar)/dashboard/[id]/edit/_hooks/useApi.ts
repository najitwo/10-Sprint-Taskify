import { useCallback, useState } from 'react';

type ApiFunction<TArgs extends readonly unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

type UseApiReturn<TArgs extends readonly unknown[], TResult> = [
  isLoading: boolean,
  error: Error | null,
  wrappedFunction: (...args: TArgs) => Promise<TResult | undefined>,
];

const useApi = <TArgs extends readonly unknown[], TResult>(
  apiFunction: ApiFunction<TArgs, TResult>
): UseApiReturn<TArgs, TResult> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const wrappedFunction = useCallback(
    async (...args: TArgs) => {
      setIsLoading(true);
      setError(null);
      try {
        return await apiFunction(...args);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction]
  );

  return [isLoading, error, wrappedFunction];
};

export default useApi;
