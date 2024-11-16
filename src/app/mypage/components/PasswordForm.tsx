'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import styles from './PasswordForm.module.css';

interface FormValues {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export default function PasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<FormValues>({ mode: 'onChange' });

  const watchedPassword = watch('newPassword');

  const onSubmit = () => {};

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
            message: '비밀번호를 8자 이상 입력해주세요.',
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
              value === watchedPassword || '비밀번호가 일치하지 않습니다.',
          },
        })}
        error={errors.newPasswordConfirmation}
      />
      <Button className={styles.button} type="submit" disabled={!isValid}>
        변경
      </Button>
    </form>
  );
}
