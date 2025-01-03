import useComment from '../../../hooks/useComment';
import { Comment } from '@/types/comment';
import { useEffect } from 'react';
import CommentDetail from './CommentDetail';
import styles from './Comments.module.css';

interface CommentsProps {
  cardId: number;
  newComment?: Comment | null;
}

export default function Comments({ cardId, newComment }: CommentsProps) {
  const { comments, setComments, observerRef } = useComment(cardId);

  useEffect(() => {
    if (newComment) {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  }, [newComment]);

  const handleDeleteComment = (deletedCommentId: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedCommentId)
    );
  };

  return (
    <>
      {comments.length > 0 ? (
        <>
          <ul className={styles.comments}>
            {comments.map((comment) => (
              <CommentDetail
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteComment}
              />
            ))}
            <div ref={observerRef} style={{ height: '1px' }}></div>
          </ul>
        </>
      ) : (
        <div className={styles.empty}>등록된 댓글이 없습니다</div>
      )}
    </>
  );
}
