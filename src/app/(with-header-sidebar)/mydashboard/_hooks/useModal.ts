import { useState } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (onClose = () => {}) => {
    setIsClosing(true);
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      setIsOpen(false);
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return {
    isOpen,
    openModal,
    isClosing,
    closeModal,
  };
}
