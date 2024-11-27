'use client';

import { ReactNode } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import Label from './Label';
import styles from './Input.module.css';

interface InputProps {
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

export default function Input({
  type = 'text',
  name,
  className = '',
  label = '',
  placeholder = '',
  children,
  register,
  error,
  readOnly = false,
  required,
}: InputProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <Label htmlFor={name}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </Label>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${error ? styles.errorFocus : ''}`}
          type={type}
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
