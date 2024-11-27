import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { formatDateToCustomFormat } from '@/utils/dateUtils';
import styles from './Comments.module.css';
import useComment from '../../hooks/useComment';

export default function Comments({ cardId }: { cardId: number }) {
  const { comments, observerRef } = useComment(cardId);

  return (
    <>
      {comments.length > 0 ? (
        <>
          <ul className={styles.comments}>
            {comments.map(({ id, content, createdAt, author }) => (
              <li key={id} className={styles.comment}>
                <Avatar name={author.nickname} className={styles.avatar} />
                <div className={styles.info}>
                  <div className={styles.user}>
                    <div className={styles.name}>{author.nickname}</div>
                    <span className={styles.date}>
                      {formatDateToCustomFormat(createdAt)}
                    </span>
                  </div>
                  <p className={styles.content}>{content}</p>
                  <div className={styles.buttonContainer}>
                    <Button className={styles.button}>수정</Button>
                    <Button className={styles.button}>삭제</Button>
                  </div>
                </div>
              </li>
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
