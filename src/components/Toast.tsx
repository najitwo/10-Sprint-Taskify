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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (toast.isPaused) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const updatedRemainingTime = toast.remainingTime - elapsedTime;

      if (updatedRemainingTime <= 0) {
        setProgress(100);
        clearInterval(interval);
        onClose(toast.id);
        return;
      }

      setProgress(
        ((toast.duration - updatedRemainingTime) / toast.duration) * 100
      );

      useToastStore.setState((state) => ({
        toasts: state.toasts.map((t) =>
          t.id === toast.id
            ? { ...t, remainingTime: updatedRemainingTime, lastUpdateTime: now }
            : t
        ),
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [toast.remainingTime, toast.isPaused]);

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]} ${
        toast.isFading ? styles.fadeOut : styles.fadeIn
      }`}
      onMouseEnter={() => pauseToast(toast.id)}
      onMouseLeave={() => resumeToast(toast.id)}
    >
      <span>{getIcon(toast.type)}</span>
      <p>{toast.message}</p>
      <Button onClick={() => onClose(toast.id)} className={styles.button}>
        <XIcon className={styles.icon} />
      </Button>
      <div className={styles.progressBar} style={{ width: `${progress}%` }} />
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
