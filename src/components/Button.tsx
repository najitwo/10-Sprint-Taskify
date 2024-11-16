import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({
  className = '',
  children,
  type = 'button',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button type={type} className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
}
