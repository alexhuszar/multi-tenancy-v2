import { useState, useEffect, useCallback } from 'react';
import type { ApiResponse } from '@multi-tenancy/types';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchResult<T> extends UseFetchState<T> {
  refetch: () => Promise<void>;
}

export function useFetch<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  deps: unknown[] = []
): UseFetchResult<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetcher();
      if (response.success) {
        setState({ data: response.data, loading: false, error: null });
      } else {
        setState({ data: null, loading: false, error: response.error });
      }
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  }, [fetcher]);

  useEffect(() => {
    fetchData();
  }, deps);

  return { ...state, refetch: fetchData };
}
