'use client';

import { createPortal } from 'react-dom';
import { ReactNode, useEffect, MouseEvent } from 'react';
import FocusTrap from './FocusTrap';
import Image from 'next/image';
import styles from './Modal.module.css';

interface ModalProps {
  isClosing: boolean;
  onClose: () => void;
  allowDimClose?: boolean;
  title?: string;
  hasCloseButton?: boolean;
  headerComponent?: React.ComponentType;
  children: ReactNode;
}

export default function Modal({
  isClosing,
  onClose,
  allowDimClose = true,
  title,
  hasCloseButton = false,
  headerComponent: Component,
  children,
}: ModalProps) {
  const handleOnClickBackground = (e: MouseEvent<HTMLDivElement>) => {
    if (!allowDimClose || !(e.target === e.currentTarget)) {
      return;
    }
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={`${styles.background} ${isClosing ? styles.fadeOut : ''}`}
      onClick={handleOnClickBackground}
    >
      <div
        className={`${styles.container} ${isClosing ? styles.slideOut : ''}`}
      >
        <FocusTrap>
          <div className={styles.titleContainer}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {Component && <Component />}
            {hasCloseButton && (
              <button
                onClick={onClose}
                className={styles.close}
                aria-label="Close modal"
              >
                <Image
                  src="/icons/x_lg.svg"
                  alt="Close icon"
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>
          {children}
        </FocusTrap>
      </div>
    </div>,
    document.body
  );
}
