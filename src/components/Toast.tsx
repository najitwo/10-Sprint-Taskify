'use client';

import useToastStore, { ToastState } from '@/store/toastStore';
import styles from './Toast.module.css';
import { useEffect, useState } from 'react';
import XIcon from '/public/icons/x_sm.svg';
import Button from './Button';

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return '✔️';
    case 'error':
      return '❌';
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    default:
      return '';
  }
};

function ToastItem({
  toast,
  onClose,
}: {
  toast: ToastState;
  onClose: (id: number) => void;
}) {
  const { pauseToast, resumeToast } = useToastStore();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.remainingTime);

    return () => clearTimeout(timer);
  }, [isPaused, toast.remainingTime, onClose, toast.id]);
  return (
    <div
      className={`${styles.toast} ${styles[toast.type]} ${
        toast.isFading ? styles.fadeOut : styles.fadeIn
      } ${toast.theme === 'dark' ? styles.dark : styles.light}`}
      onMouseEnter={() => {
        pauseToast(toast.id);
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        resumeToast(toast.id);
        setIsPaused(false);
      }}
    >
      <span>{getIcon(toast.type)}</span>
      <p>{toast.message}</p>
      {toast.showButton && (
        <Button onClick={() => onClose(toast.id)} className={styles.button}>
          <XIcon className={styles.icon} />
        </Button>
      )}
      <div
        className={`${styles.progressBar} ${styles.animate}`}
        style={{
          animationDuration: `${toast.duration}ms`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      />
    </div>
  );
}

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
}
