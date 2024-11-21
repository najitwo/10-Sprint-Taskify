import { useEffect, useRef, useState } from 'react';
import { getMyInvitations } from '../_lib/myInvitationService';
import type { Invitation } from '@/types/invitation';

const PAGE_SIZE = 10;

export const useMyInvitations = (title?: string) => {
  const [myInvitations, setMyInvitations] = useState<Invitation[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMyInvitations = async () => {
    setIsLoading(true);
    setError(null);

    const params: { size: number; cursorId?: number; title?: string } = {
      size: PAGE_SIZE,
    };

    if (cursorId !== null) {
      params.cursorId = cursorId;
    }

    if (title) {
      params.title = title;
    }

    try {
      const response = await getMyInvitations(params);

      setMyInvitations((prev) => [...prev, ...response.invitations]);
      setCursorId(response.cursorId || null);
      setHasMore(!!response.cursorId);
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
    setHasMore(true);
    fetchMyInvitations();
  }, [title]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
          setIsFetching(true);
        }
      },
      { threshold: 0.5 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isFetching, hasMore]);

  return {
    myInvitations,
    isLoading,
    error,
    observerRef,
  };
};
