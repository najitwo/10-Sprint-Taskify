'use client';

import { useForm } from 'react-hook-form';
import Button from './Button';
import Input from './Input';
import styles from './ProfileForm.module.css';
import FileInput from './FileInput';

export interface FormValues {
  image: File;
  email: string;
  nickname: string;
}

export default function ProfileForm() {
  const { handleSubmit, setValue } = useForm<FormValues>();

  const onSubmit = () => {};

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>프로필</h2>
      <FileInput name="imgFile" setValue={setValue} />
      <Input
        className={styles.input}
        type="text"
        name="email"
        label="이메일"
        placeholder="test@email.com"
        readOnly
      />
      <Input
        className={styles.input}
        type="text"
        name="nickname"
        label="닉네임"
        placeholder="닉네임 입력"
      />
      <Button className={styles.button}>저장</Button>
    </form>
  );
}
