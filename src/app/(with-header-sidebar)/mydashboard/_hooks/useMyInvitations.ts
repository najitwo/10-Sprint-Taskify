import { useState, useEffect } from 'react';
import { getMyInvitations } from '../_lib/myInvitationService';
import { useIntersectionObserver } from './useIntersectionObserver';
import type { Invitation } from '@/types/invitation';

const PAGE_SIZE = 10;

export const useMyInvitations = (title?: string | null, reloadKey?: number) => {
  const [myInvitations, setMyInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursorId, setCursorId] = useState<number | null>(null);

  const fetchMyInvitations = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    const params: { size: number; cursorId?: number; title?: string } = {
      size: PAGE_SIZE,
      ...(cursorId !== null && { cursorId }),
      ...(title !== null && { title }),
    };

    try {
      const response = await getMyInvitations(params);
      setMyInvitations((prev) => [...prev, ...response.invitations]);
      setCursorId(response.cursorId || null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch invitations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMyInvitations([]);
    setCursorId(null);
    fetchMyInvitations();
  }, [title, reloadKey]);

  const observerRef = useIntersectionObserver(
    fetchMyInvitations,
    isLoading,
    cursorId
  );

  return {
    myInvitations,
    isLoading,
    error,
    observerRef,
  };
};
