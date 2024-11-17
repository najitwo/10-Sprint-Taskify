import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from '@/components/Button';
import { ERROR_MESSAGES } from '../constants/message';
import styles from './Form.module.css';
import { updatePassword } from '../lib/authHelper';

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export default function PasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setError,
    reset,
  } = useForm<PasswordFormValues>({ mode: 'onChange' });

  const customIsValid = Object.keys(errors).length === 0;
  const watchedPassword = watch('newPassword');

  const onSubmit = async (data: PasswordFormValues) =>
    updatePassword(data, reset, setError);

  useEffect(() => {
    if (watchedPassword) {
      trigger('newPasswordConfirmation');
    }
  }, [watchedPassword, trigger]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>비밀번호 변경</h2>
      <Input
        className={styles.input}
        type="password"
        name="currentPassword"
        label="현재 비밀번호"
        placeholder="비밀번호 입력"
        register={register('currentPassword')}
        error={errors.currentPassword}
      />
      <Input
        className={styles.input}
        type="password"
        name="newPassword"
        label="새 비밀번호"
        placeholder="새 비밀번호 입력"
        register={register('newPassword', {
          minLength: {
            value: 8,
            message: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
          },
        })}
        error={errors.newPassword}
      />
      <Input
        type="password"
        name="newPasswordConfirmation"
        label="새 비밀번호 확인"
        placeholder="새 비밀번호 확인"
        register={register('newPasswordConfirmation', {
          validate: {
            matchesPassword: (value) =>
              value === watchedPassword || ERROR_MESSAGES.PASSWORDS_MATCH,
          },
        })}
        error={errors.newPasswordConfirmation}
      />
      <Button className={styles.button} type="submit" disabled={!customIsValid}>
        변경
      </Button>
    </form>
  );
}
