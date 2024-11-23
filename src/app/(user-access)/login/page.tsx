'use client';

import React from 'react';
import { useForm, FieldValues, UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import Button from '@/components/Button';
import styles from './loginPage.module.css';
import axiosInstance from '@/lib/axiosInstance';
import Image from 'next/image';
import { ERROR_MESSAGES } from '@/constants/message';

type LoginFormInputs = {
  email: string;
  password: string;
};

type CustomUseFormReturn<TFieldValues extends FieldValues = FieldValues> =
  UseFormReturn<TFieldValues> & {
    formState: {
      isValid: boolean;
    };
  };
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: 'onChange',
  }) as CustomUseFormReturn<LoginFormInputs>;

  const router = useRouter();
  const { setAccessToken } = useAuthStore();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axiosInstance.post('/login', data);
      const { accessToken } = response.data;

      setAccessToken(accessToken);
      router.push('/mydashboard');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputWrapper}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo_main.svg"
            alt="로고"
            width={100}
            height={100}
            className={styles.logo}
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer' }}
          />
          <p className={styles.greeting}>오늘도 만나서 반가워요!</p>
        </div>

        <label htmlFor="email" className={styles.label}>
          이메일
        </label>
        <input
          id="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          {...register('email', {
            required: ERROR_MESSAGES.REQUIRED_EMAIL,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: ERROR_MESSAGES.INVALID_EMAIL,
            },
          })}
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="password" className={styles.label}>
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
          {...register('password', {
            required: ERROR_MESSAGES.PASSWORD_REQUIRE,
            minLength: {
              value: 8,
              message: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
            },
          })}
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className={!isValid ? styles.disabled : ''}
        style={{ height: '40px' }}
      >
        로그인
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p>
          회원이 아니신가요?{' '}
          <span
            style={{
              color: 'var(--violet)',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/signup')}
          >
            회원가입하기
          </span>{' '}
        </p>
      </div>
    </form>
  );
}
