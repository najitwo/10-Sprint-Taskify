'use client';

import { ReactNode } from 'react';
import Label from './Label';
import styles from './Textarea.module.css';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps {
  type?: string;
  name: string;
  className?: string;
  label?: string;
  placeholder?: string;
  children?: ReactNode;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  readOnly?: boolean;
  required?: boolean;
}

export default function Textarea({
  name,
  className = '',
  label = '',
  placeholder = '',
  children,
  register,
  error,
  readOnly = false,
  required,
}: TextareaProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <Label htmlFor={name}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </Label>
      <div className={styles.textareaWrapper}>
        <textarea
          className={`${styles.textarea} ${error ? styles.errorFocus : ''}`}
          placeholder={placeholder}
          readOnly={readOnly}
          {...register}
        />
        {children}
      </div>
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
}
