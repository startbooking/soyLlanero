// hooks/usePendingReservation.ts
import { useCallback } from 'react';

export const usePendingReservation = () => {
  const STORAGE_KEY = "pending_reservation";

  const saveReservation = useCallback((data: any) => {
    const payload = {
      ...data,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, []);

  const getReservation = useCallback(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }, []);

  const clearReservation = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { saveReservation, getReservation, clearReservation };
};