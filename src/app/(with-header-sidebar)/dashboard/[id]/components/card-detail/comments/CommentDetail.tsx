import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { formatDateToCustomFormat } from '@/utils/dateUtils';
import { Comment } from '@/types/comment';
import styles from './CommentDetail.module.css';

export default function CommentDetail({ content, createdAt, author }: Comment) {
  return (
    <li className={styles.comment}>
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
  );
}
