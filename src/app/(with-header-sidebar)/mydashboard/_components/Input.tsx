'use client';

import { ReactNode } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.css';

interface InputProps {
  type?: string;
  name: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  label?: string;
  placeholder?: string;
  children?: ReactNode;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  readOnly?: boolean;
}

export default function Input({
  type = 'text',
  name,
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  label = '',
  placeholder = '',
  children,
  register,
  error,
  readOnly = false,
}: InputProps) {
  return (
    <div className={`${styles.container}`}>
      <label className={`${styles.label} ${labelClassName}`} htmlFor={name}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${inputClassName} ${error ? styles.errorFocus : ''}`}
          type={type}
          placeholder={placeholder}
          readOnly={readOnly}
          {...register}
        />
        {children}
      </div>
      {error && (
        <span className={`${styles.error} ${errorClassName}`}>
          {error.message}
        </span>
      )}
    </div>
  );
}
