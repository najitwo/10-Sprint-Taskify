'use client';

import { MouseEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useModalStore from '@/store/modalStore';
import styles from './Modal.module.css';

export default function Modal() {
  const { modals, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (modals.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [closeModal, modals]);

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  if (modals.length === 0) return null;

  return createPortal(
    <div className={styles.overlay} onClick={handleOutsideClick}>
      {modals.map((content, index) => (
        <div key={index} className={styles.modal} ref={modalRef}>
          {content}
        </div>
      ))}
    </div>,
    document.body
  );
}
