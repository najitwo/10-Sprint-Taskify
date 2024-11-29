import useModalStore from '@/store/modalStore';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useDashboardStore from '@/store/dashboardStore';
import { ERROR_MESSAGES } from '@/constants/message';
import { ColumnFormValue } from '@/types/dashboardView';
import useDashBoardView from '../hooks/useDashBoardView';
import { createColumn } from '@/lib/columnServie';
import styles from './CommonColumnModal.module.css';

export default function CreateColumnModal() {
  const { closeModal } = useModalStore();
  const dashboard = useDashboardStore((state) => state.dashboard);
  const { columns } = useDashBoardView(dashboard ? `${dashboard.id}` : '');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ColumnFormValue>({ mode: 'onChange' });

  const onSubmit = async (data: ColumnFormValue) => {
    if (dashboard) {
      await createColumn(dashboard.id, data.title);
    }
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>새 컬럼 생성</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          name="title"
          label="이름"
          placeholder="새로운 프로젝트"
          register={register('title', {
            required: ERROR_MESSAGES.TITLE_REQUIRE,
            validate: (value) => {
              const isDuplicate = columns.some(
                (column) => column.title === value
              );
              return isDuplicate ? '이미 존재하는 컬럼입니다.' : true;
            },
          })}
          error={errors.title}
        />

        <div className={styles.footer}>
          <Button
            onClick={() => {
              closeModal();
            }}
            className={styles.negativeButton}
          >
            취소
          </Button>
          <Button type="submit" disabled={!isValid}>
            생성
          </Button>
        </div>
      </form>
    </div>
  );
}
