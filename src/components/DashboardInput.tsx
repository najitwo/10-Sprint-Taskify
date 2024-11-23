import { ERROR_MESSAGES } from '@/constants/message';
import { ReactNode } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import ColorRadioInput from './ColorRadioInput';
import { UpdateDashboardRequestParams } from '@/types/dashboards';
import Input from './Input';
import styles from './DashboardInput.module.css';

export default function DashboardInput({
  register,
  errors,
  children,
}: {
  register: UseFormRegister<UpdateDashboardRequestParams>;
  errors: FieldErrors<UpdateDashboardRequestParams>;
  children: ReactNode;
}) {
  return (
    <div>
      <Input
        className={styles.input}
        name="title"
        label="대시보드 이름"
        register={register('title', {
          required: ERROR_MESSAGES.DASHBOARD_TITLE_REQUIRE,
        })}
        error={errors.title}
      />
      <ColorRadioInput
        register={register('color', {
          required: true,
        })}
      />
      {children}
    </div>
  );
}
