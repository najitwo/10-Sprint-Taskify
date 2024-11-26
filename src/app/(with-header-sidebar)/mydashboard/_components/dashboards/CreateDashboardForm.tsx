import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import DashboardInput from '@/components/DashboardInput';
import styles from './CreateDashboardForm.module.css';
import { CreateDashboardRequestBody } from '@/types/dashboards';
import { createDashboard } from '@/lib/boardService';
import { useRouter } from 'next/navigation';

interface CreateDashboardFormProps {
  closeModal: () => void;
}

export default function CreateDashboardForm({
  closeModal,
}: CreateDashboardFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateDashboardRequestBody>({ mode: 'onChange' });
  const router = useRouter();

  const onSubmit = async (newDashboard: CreateDashboardRequestBody) => {
    const response = await createDashboard(newDashboard);
    closeModal();
    router.push(`/dashboard/${response.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <DashboardInput register={register} errors={errors}>
        <div className={styles.buttonWrapper}>
          <Button className={styles.btnCancel} onClick={() => closeModal()}>
            취소
          </Button>
          <Button type="submit" disabled={!isValid}>
            생성
          </Button>
        </div>
      </DashboardInput>
    </form>
  );
}
