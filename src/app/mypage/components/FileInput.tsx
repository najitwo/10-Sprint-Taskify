import { useEffect } from 'react';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import styles from './FileInput.module.css';

interface FileInputProps {
  id: string;
  name: 'image';
  setValue: (name: 'image', value: File | null) => void;
  url?: string | null;
}

export default function FileInput({ name, setValue, url, id }: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
    <>
      <label className={styles.label} htmlFor={id}>
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
        id={id}
        name={name}
        accept="image/png, image/jpeg"
        onChange={handleChange}
      />
    </>
  );
}
