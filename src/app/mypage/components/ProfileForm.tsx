import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useAuthStore from '../store/authStore';
import axios from '../lib/axios';
import FileInput from './FileInput';
import Input from './Input';
import Button from '@/components/Button';
import styles from './ProfileForm.module.css';

export interface FormValues {
  image: File | null;
  email: string;
  nickname: string;
}

export default function ProfileForm() {
  const { setUser } = useAuthStore();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>();

  const customIsValid = Object.keys(errors).length === 0;

  const onSubmit = async (data: FormValues) => {
    const { image, nickname } = data;
    let url = null;
    try {
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post('/users/me/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        url = response.data.profileImageUrl;
      }
      const response = await axios.put('/users/me', {
        nickname,
        ...(url && { profileImageUrl: url }),
      });
      setUser(response.data);
    } catch (error) {
      if (error instanceof Error) {
      }
    }
  };

  useEffect(() => {
    if (user) {
      const { email, nickname } = user;
      reset({ email, nickname });
    }
  }, [reset, user]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>프로필</h2>
      <FileInput
        name="imgFile"
        setValue={setValue}
        url={user?.profileImageUrl}
      />
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
        register={register('nickname')}
      />
      <Button className={styles.button} type="submit" disabled={!customIsValid}>
        저장
      </Button>
    </form>
  );
}
