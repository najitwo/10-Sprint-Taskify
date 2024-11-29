import useModalStore from '@/store/modalStore';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useDashboardStore from '@/store/dashboardStore';
import { ERROR_MESSAGES } from '@/constants/message';
import { ColumnFormValue } from '@/types/dashboardView';
import useDashBoardView from '../hooks/useDashBoardView';
import { deleteColumn, updateColumn } from '@/lib/columnServie';
import CloseButton from './CloseButton';
import styles from './CommonColumnModal.module.css';

export default function SettingsColumnModal({
  title: prevTitle,
  id,
}: ColumnFormValue) {
  const { closeModal } = useModalStore();
  const dashboard = useDashboardStore((state) => state.dashboard);
  const { columns } = useDashBoardView(dashboard ? `${dashboard.id}` : '');

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<ColumnFormValue>({ mode: 'onChange' });

  const handleError = (message: string) => {
    setError('title', {
      type: 'manual',
      message,
    });
  };

  const { title } = watch();
  const restColumns = columns.filter((column) => column.id !== id);
  const isDuplicate = restColumns.some((column) => column.title === title);

  const onDelete = async () => {
    console.log(title);
    if (!title) {
      handleError('삭제하려면 해당 컬럼의 이름을 입력해주세요.');
      return;
    }

    if (title !== prevTitle) {
      if (isDuplicate) {
        handleError('다른 컬럼은 삭제할 수 없습니다.');
      } else {
        handleError('존재하지 않는 컬럼입니다.');
      }
      return;
    }

    await deleteColumn(`${id}`);
    closeModal();
  };

  const onUpdate = async (data: ColumnFormValue) => {
    const { title } = data;

    if (title === prevTitle) {
      closeModal();
      return;
    }

    if (isDuplicate) {
      handleError('이미 존재하는 컬럼입니다.');
      return;
    }

    if (title) await updateColumn(`${id}`, title);
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h2 className={styles.title}>컬럼 관리</h2>
        <CloseButton onClick={closeModal} />
      </div>

      <form onSubmit={handleSubmit(onUpdate)} className={styles.form}>
        <Input
          name="title"
          label="이름"
          placeholder={prevTitle}
          register={register('title', {
            required: ERROR_MESSAGES.TITLE_REQUIRE,
          })}
          error={errors.title}
        />

        <div className={styles.footer}>
          <Button
            type="button"
            onClick={onDelete}
            className={styles.negativeButton}
          >
            삭제
          </Button>
          <Button type="submit">변경</Button>
        </div>
      </form>
    </div>
  );
}
