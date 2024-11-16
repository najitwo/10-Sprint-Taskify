import { useEffect } from 'react';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from './ProfileForm';
import styles from './FileInput.module.css';

interface FileInputProps {
  name: string;
  setValue: UseFormSetValue<FormValues>;
  url: string | null | undefined;
}

export default function FileInput({ name, setValue, url }: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('image', file);
    }
  };

  useEffect(() => {
    if (url) {
      setPreview(url);
    }
  }, [url]);

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
