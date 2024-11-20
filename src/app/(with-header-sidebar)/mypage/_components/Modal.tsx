'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import useModalStore from '@/store/modalStore';
import styles from './Modal.module.css';

export default function Modal() {
  const { modals, closeModal } = useModalStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  if (modals.length === 0) return null;

  return createPortal(
    <div className={styles.overlay}>
      {modals.map((content, index) => (
        <div key={index} className={styles.modal}>
          {content}
        </div>
      ))}
    </div>,
    document.body
  );
}
