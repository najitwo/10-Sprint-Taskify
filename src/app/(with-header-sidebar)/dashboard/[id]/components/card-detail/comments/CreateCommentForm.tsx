import { useForm } from 'react-hook-form';
import type { CreateCommentRequestBody } from '@/types/comment';
import styles from './CreateCommentForm.module.css';
import Button from '@/components/Button';
import { createComment } from '@/lib/commentService';

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
    await createComment({ ...data, cardId, columnId, dashboardId });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="comment">댓글</label>
      <div className={styles.textareaWrapper}>
        <textarea
          className={styles.textarea}
          {...register('content', { required: true })}
          id="comment"
        />
        <div className={styles.buttonWrapper}>
          <Button disabled={!isValid} type="submit">
            입력
          </Button>
        </div>
      </div>
    </form>
  );
}
