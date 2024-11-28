import useModalStore from '@/store/modalStore';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useDashboardStore from '@/store/dashboardStore';
import { ERROR_MESSAGES } from '@/constants/message';
import { PostColumnRequest } from '@/types/dashboardView';
import { createColumn } from '@/lib/columnServie';
import styles from './CreateColumnModal.module.css';

export default function CreateColumnModal() {
  const { closeModal } = useModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostColumnRequest>({ mode: 'onChange' });
  const dashboard = useDashboardStore((state) => state.dashboard);

  const onSubmit = async (data: PostColumnRequest) => {
    if (dashboard) {
      await createColumn(dashboard.id, data.title);
      closeModal();
    }
  };

  return (
    <div className={styles.modalContent}>
      <h2 className={styles.modalTitle}>새 컬럼 생성</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="colTitle"
          label="이름"
          placeholder="새로운 프로젝트"
          register={register('title', {
            required: ERROR_MESSAGES.TITLE_REQUIRE,
          })}
          error={errors.title}
        />

        <div className={styles.footer}>
          <Button onClick={closeModal} className={styles.cancel}>
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
