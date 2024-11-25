'use client';

import { MouseEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import useModalStore from '@/store/modalStore';
import FocusTrap from '../../mydashboard/_components/modal/FocusTrap';
import styles from './Modal.module.css';

export default function Modal() {
  const { modals, closeModal, isModalVisible, closeAllModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const currentPath = usePathname();

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

  useEffect(() => {
    closeAllModal();
  }, [currentPath, closeAllModal]);

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  if (modals.length === 0) return null;

  return createPortal(
    <div className={styles.overlay} onClick={handleOutsideClick}>
      {modals.map((content, index) => (
        <div
          key={index}
          className={`${styles.modal} ${isModalVisible ? styles.visible : styles.hidden}`}
          ref={modalRef}
        >
          <FocusTrap>{content}</FocusTrap>
        </div>
      ))}
    </div>,
    document.body
  );
}
