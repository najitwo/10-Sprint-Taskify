import { useEffect } from 'react';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { UseFormSetValue, FieldValues, Path, PathValue } from 'react-hook-form';
import styles from './FileInput.module.css';

interface FileInputProps<T extends FieldValues> {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  url?: string | null;
}

export default function FileInput<T extends FieldValues>({
  name,
  setValue,
  url,
}: FileInputProps<T>) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue(name, file as PathValue<T, Path<T>>);
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
