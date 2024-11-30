'use client';

import { useEffect } from 'react';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import styles from './FileInput.module.css';
import { toast } from '@/store/toastStore';

interface FileInputProps {
  id: string;
  name: 'image';
  setValue: (name: 'image', value: File | null) => void;
  url?: string | null;
  className?: string;
  label?: string;
}

export default function FileInput({
  name,
  setValue,
  url,
  id,
  className,
  label,
}: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error({ message: '지원하지 않는 파일 형식입니다.' });
        return;
      }
      setPreview(URL.createObjectURL(file));
      setValue(name, file);
    }
  };

  useEffect(() => {
    if (url) {
      setPreview(url);
    }
  }, [url]);

  return (
    <div>
      {label && <span className={styles.label}>{label}</span>}
      <label className={`${styles.wrapper} ${className}`} htmlFor={id}>
        {preview ? (
          <>
            <Image src={preview} alt="미리보기" fill className={styles.image} />
            <Image
              src="/icons/edit.svg"
              alt="이미지수정"
              width={30}
              height={30}
              className={styles.hoverContent}
            />
          </>
        ) : (
          <div className={styles.iconContainer}>
            <Image src="/icons/add.svg" alt="이미지 추가" fill />
          </div>
        )}
      </label>
      <input
        className={styles.input}
        type="file"
        id={id}
        name={name}
        accept="image/png, image/jpeg"
        onChange={handleChange}
      />
    </div>
  );
}
