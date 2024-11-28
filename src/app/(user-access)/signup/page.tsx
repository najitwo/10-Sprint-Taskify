'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import styles from './signPage.module.css';
import axiosInstance from '@/lib/axiosInstance';
import { ERROR_MESSAGES } from '@/constants/message';
import { AxiosError } from 'axios';

type SignupFormInputs = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setError,
  } = useForm<SignupFormInputs>({ mode: 'onChange' });
  const router = useRouter();

  const watchPassword = watch('password');
  const onSubmit = async (data: SignupFormInputs) => {
    try {
      await axiosInstance.post('/users', {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      });
      alert('회원가입이 완료되었습니다.');
      router.push('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setError('email', {
            type: 'manual',
            message: ERROR_MESSAGES.EMAIL_DUPLICATE,
          });
        } else if (error.response?.status === 400) {
          alert(error.response.data.message);
        } else {
          alert('회원가입 중 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
        <div className={styles.inputWrapper}>
          <p className={styles.greeting}>첫 방문을 환영합니다!</p>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            id="email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            {...register('email', {
              required: ERROR_MESSAGES.EMAIL_REQUIRE,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: ERROR_MESSAGES.INVALID_EMAIL,
              },
            })}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="nickname" className={styles.label}>
            닉네임
          </label>
          <input
            id="nickname"
            className={`${styles.input} ${errors.nickname ? styles.inputError : ''}`}
            {...register('nickname', {
              required: ERROR_MESSAGES.NICKNAME_REQUIRE,
              maxLength: {
                value: 10,
                message: ERROR_MESSAGES.NICKNAME_TOO_LONG,
              },
            })}
          />
          {errors.nickname && (
            <p className={styles.errorMessage}>{errors.nickname.message}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
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
        <div className={styles.inputWrapper}>
          <label htmlFor="confirmPassword" className={styles.label}>
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
            {...register('confirmPassword', {
              required: ERROR_MESSAGES.PASSWORD_CONFIRM_MISMATCH,
              validate: (value) =>
                value === watchPassword || ERROR_MESSAGES.PASSWORDS_MATCH,
            })}
          />
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className={`${styles.termsAccepted}`}>
          <input
            type="checkbox"
            id="termsAccepted"
            className={styles.input}
            {...register('termsAccepted', {
              required: true,
            })}
          />
          <label htmlFor="termsAccepted">이용 약관에 동의합니다.</label>
          {errors.termsAccepted && (
            <p className={styles.errorMessage}>
              {errors.termsAccepted.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={!isValid || !!errors.termsAccepted}
          className={isValid ? '' : styles.disabled}
          style={{ height: '40px' }}
        >
          가입하기
        </Button>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p>
            이미 회원이신가요?{' '}
            <span
              style={{
                color: 'var(--violet)',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => router.push('/login')}
            >
              로그인하기
            </span>{' '}
          </p>
        </div>
      </form>
    </div>
  );
}
