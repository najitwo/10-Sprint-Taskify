import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { formatDateToCustomFormat } from '@/utils/dateUtils';
import { Comment, UpdateCommentRequestBody } from '@/types/comment';
import styles from './CommentDetail.module.css';
import { useForm } from 'react-hook-form';
import { updateComment } from '@/lib/commentService';

export default function CommentDetail({
  id,
  content,
  createdAt,
  author,
}: Comment) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<UpdateCommentRequestBody>({ mode: 'onChange' });

  const onSubmit = async (data: UpdateCommentRequestBody) => {
    const response = await updateComment({
      commentId: id,
      data,
    });
    reset();
  };

  return (
    <li className={styles.comment}>
      <Avatar name={author.nickname} className={styles.avatar} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.info}>
          <div className={styles.user}>
            <div className={styles.name}>{author.nickname}</div>
            <span className={styles.date}>
              {formatDateToCustomFormat(createdAt)}
            </span>
          </div>
          {/* <input /> */}
          <p className={styles.content}>{content}</p>
          <div className={styles.buttonContainer}>
            <Button className={styles.button} type="submit">
              수정
            </Button>
            <Button className={styles.button}>삭제</Button>
          </div>
        </div>
      </form>
    </li>
  );
}
