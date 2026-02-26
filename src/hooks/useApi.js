import { useState, useEffect, useCallback } from 'react';

/**
 * Generic hook for fetching data from the API
 * @param {Function} fetchFn - async function that returns data
 * @param {Array} deps - dependencies that trigger a re-fetch
 * @returns {{ data, loading, error, refetch }}
 */
export function useApi(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

/**
 * Hook for paginated API data
 * @param {Function} fetchFn - async function that accepts { page } and returns { data, count }
 * @param {number} pageSize
 */
export function usePaginatedApi(fetchFn, pageSize = 20) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn({ page, page_size: pageSize });
      setItems(result.data || result.items || result.products || result.orders || []);
      setCount(result.count || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => { fetch(); }, [fetch]);

  const totalPages = Math.ceil(count / pageSize);

  return {
    items,
    count,
    page,
    totalPages,
    loading,
    error,
    setPage,
    refetch: fetch,
  };
}