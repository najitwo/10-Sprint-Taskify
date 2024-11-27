import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/app/(with-header-sidebar)/mydashboard/_hooks/useIntersectionObserver';
import { Comment } from '@/types/comment';
import { getComments } from '@/lib/commentService';

const useComment = (cardId: number, pageSize: number = 3) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursorId, setCursorId] = useState<number | null>(null);

  const fetchComments = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    const params: { cardId: number; size: number; cursorId?: number } = {
      cardId,
      size: pageSize,
      ...(cursorId !== null && { cursorId }),
    };

    try {
      const response = await getComments(params);
      setComments((prev) => [...prev, ...response.comments]);
      setCursorId(response.cursorId || null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch comments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setComments([]);
    setCursorId(null);
    fetchComments();
  }, []);

  const observerRef = useIntersectionObserver(
    fetchComments,
    isLoading,
    cursorId
  );

  return {
    comments,
    isLoading,
    error,
    observerRef,
  };
};

export default useComment;
