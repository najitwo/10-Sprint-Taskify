'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../_hooks/useAuth';
import FileInput from './FileInput';
import Input from './Input';
import Button from '@/components/Button';
import { updateProfile } from '../_lib/userService';
import { ERROR_MESSAGES } from '@/constants/message';
import styles from './Form.module.css';

export interface ProfileFormValues {
  image: File | null;
  email: string;
  nickname: string;
}

export default function ProfileForm() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<ProfileFormValues>({ mode: 'onChange' });

  const onSubmit = async (data: ProfileFormValues) => updateProfile(data);

  useEffect(() => {
    if (user) {
      const { email, nickname } = user;
      reset({ email, nickname });
    }
  }, [reset, user]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>프로필</h2>
      <div className={styles.profile}>
        <FileInput
          id="image"
          name="image"
          setValue={setValue}
          url={user?.profileImageUrl}
        />
        <div className={styles.userInfo}>
          <Input
            className={styles.input}
            type="text"
            name="email"
            label="이메일"
            register={register('email')}
            readOnly
          />
          <Input
            className={styles.input}
            type="text"
            name="nickname"
            label="닉네임"
            placeholder="닉네임 입력"
            register={register('nickname', {
              required: ERROR_MESSAGES.NICKNAME_REQUIRE,
            })}
            error={errors.nickname}
          />
          <Button className={styles.button} type="submit" disabled={!isValid}>
            저장
          </Button>
        </div>
      </div>
    </form>
  );
}
