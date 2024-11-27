import { useForm } from 'react-hook-form';
import type { CreateCommentRequestBody } from '@/types/comment';
import Button from '@/components/Button';
import { createComment } from '@/lib/commentService';
import styles from './CreateCommentForm.module.css';

export default function CreateCommentForm({
  cardId,
  columnId,
  dashboardId,
}: Omit<CreateCommentRequestBody, 'content'>) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CreateCommentRequestBody>({
    mode: 'onChange',
  });

  const onSubmit = async (data: CreateCommentRequestBody) => {
    // TODO 댓글 입력 완료되면 하위 조회에 데이터 덧붙이기
    await createComment({ ...data, cardId, columnId, dashboardId });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="comment" className={styles.label}>
        댓글
      </label>
      <div className={styles.textareaWrapper}>
        <textarea
          className={styles.textarea}
          {...register('content', { required: true })}
          id="comment"
          placeholder="댓글 작성하기"
        />
        <div className={styles.buttonWrapper}>
          <Button disabled={!isValid} type="submit" className={styles.button}>
            입력
          </Button>
        </div>
      </div>
    </form>
  );
}
