
import { useState, useEffect } from 'react';
import { cacheService } from '@/services/cacheService';

interface UseCachedDataOptions<T> {
  cacheKey: string;
  fetchFn: () => Promise<T>;
  expiry?: number;
  enabled?: boolean;
}

export const useCachedData = <T>({
  cacheKey,
  fetchFn,
  expiry = 60 * 60 * 1000, // 1 hora por defecto
  enabled = true
}: UseCachedDataOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const loadData = async () => {
      // Verificar si hay datos en cache
      const cachedData = cacheService.get<T>(cacheKey);
      if (cachedData) {
        setData(cachedData);
        return;
      }

      // Si no hay cache, hacer fetch
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchFn();
        setData(result);
        cacheService.set(cacheKey, result, expiry);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar datos');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [cacheKey, enabled, expiry]);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
      cacheService.set(cacheKey, result, expiry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
      console.error('Error refetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCache = () => {
    cacheService.delete(cacheKey);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
    clearCache
  };
};
