import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({
  className = '',
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
}
