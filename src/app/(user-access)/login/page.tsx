'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useAuthStore from '@/store/authStore';
import { AUTH_URL } from '@/constants/urls';
import Button from '@/components/Button';
import styles from './loginPage.module.css';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();
  const { setAccessToken } = useAuthStore();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(`${AUTH_URL}/login`, data);
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
          <img
            src="/images/logo_main.svg"
            alt="로고"
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
            required: '이메일을 입력해 주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '이메일 형식으로 작성해 주세요.',
            },
          })}
        />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
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
            required: '비밀번호를 입력해 주세요.',
            minLength: {
              value: 8,
              message: '8자 이상 작성해 주세요.',
            },
          })}
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      </div>

      <Button type="submit">로그인</Button>
      <p>회원이 아니신가요? 회원가입하기</p>
    </form>
  );
}
