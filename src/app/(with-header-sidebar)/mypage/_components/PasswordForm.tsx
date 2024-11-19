'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from '@/components/Button';
import { ERROR_MESSAGES } from '../_constants/message';
import styles from './Form.module.css';
import useModalStore from '../_store/modalStore';
import axios from '../_lib/axios';
import AlertModal from './AlertModal';

export interface PasswordFormValues {
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
    setError,
    reset,
  } = useForm<PasswordFormValues>({ mode: 'onChange' });
  const { openModal } = useModalStore();

  const customIsValid = Object.keys(errors).length === 0;
  const watchedPassword = watch('newPassword');

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      await axios.put('/auth/password', {
        password: data.currentPassword,
        newPassword: data.newPassword,
      });
      reset();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === ERROR_MESSAGES.CURRENT_PASSWORD_INCORRECT) {
          openModal(<AlertModal>{error.message}</AlertModal>);
          setError('currentPassword', {
            type: 'manual',
            message: error.message,
          });
        }
        if (error.message === ERROR_MESSAGES.SAME_AS_OLD_PASSWORD) {
          openModal(<AlertModal>{error.message}</AlertModal>);
          setError('newPassword', {
            type: 'manual',
            message: error.message,
          });
        }
      }
    }
  };

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
        register={register('currentPassword', {
          required: ERROR_MESSAGES.PASSWORD_REQUIRE,
        })}
        error={errors.currentPassword}
      />
      <Input
        className={styles.input}
        type="password"
        name="newPassword"
        label="새 비밀번호"
        placeholder="새 비밀번호 입력"
        register={register('newPassword', {
          required: ERROR_MESSAGES.PASSWORD_REQUIRE,
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
            required: (value) =>
              value !== '' || ERROR_MESSAGES.PASSWORD_REQUIRE,
          },
        })}
        error={errors.newPasswordConfirmation}
      />
      <Button
        className={styles.button}
        type="submit"
        disabled={!(isValid && customIsValid)}
      >
        변경
      </Button>
    </form>
  );
}
