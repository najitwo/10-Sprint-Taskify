import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { ERROR_MESSAGES } from '../../_constants/message';
import styles from './CreateDashboardForm.module.css';
import Input from '../Input';

interface CreateDashboardFormValue {
  title: string;
  color: string;
}

export default function CreateDashboardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateDashboardFormValue>({ mode: 'onChange' });

  const onSubmit = () => {
    // TODO
    console.log('CreateDashboardContent');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        name="title"
        label="대시보드 이름"
        placeholder="새로운 프로젝트"
        register={register('title', {
          required: ERROR_MESSAGES.DASHBOARD_TITLE_REQUIRE,
        })}
        error={errors.title}
      />
      <div>
        <Button>취소</Button>
        <Button type="submit" disabled={!isValid}>
          생성
        </Button>
      </div>
    </form>
  );
}
