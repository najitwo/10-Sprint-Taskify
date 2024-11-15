import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from './ProfileForm';
import styles from './FileInput.module.css';

interface FileInputProps {
  name: 'imgFile';
  setValue: UseFormSetValue<FormValues>;
}

export default function FileInput({ name, setValue }: FileInputProps) {
  const [preview, setPreview] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('image', file);
    }
  };

  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {preview ? (
          <Image src={preview} alt="미리보기" fill />
        ) : (
          <div className={styles.iconContainer}>
            <Image src="/icons/add.svg" alt="이미지 추가" fill />
          </div>
        )}
      </label>
      <input
        className={styles.input}
        type="file"
        accept="image/png, image/jpeg"
        name={name}
        id={name}
        onChange={handleChange}
      />
    </>
  );
}
