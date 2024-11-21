import { useEffect, useRef, useState } from 'react';
import { getMyInvitations } from '../_lib/myInvitationService';
import type { Invitation } from '@/types/invitation';

const PAGE_SIZE = 10;

export const useMyInvitations = (title?: string) => {
  const [myInvitations, setMyInvitations] = useState<Invitation[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMyInvitations = async () => {
    if (isFetching) return;

    setIsFetching(true);
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
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMyInvitations([]);
    setCursorId(null);
    setIsLoading(true);
    fetchMyInvitations();
  }, [title]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cursorId != null && !isFetching) {
          fetchMyInvitations();
        }
      },
      { threshold: 0.5 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isFetching]);

  return {
    myInvitations,
    isLoading,
    error,
    observerRef,
  };
};
