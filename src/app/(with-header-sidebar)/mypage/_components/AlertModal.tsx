import { ReactNode } from 'react';
import Button from '@/components/Button';
import styles from './AlertModal.module.css';
import useModalStore from '../_store/modalStore';

export default function AlertModal({ children }: { children: ReactNode }) {
  const { closeModal } = useModalStore();

  return (
    <div className={styles.modal}>
      {children}
      <Button className={styles.button} onClick={closeModal}>
        확인
      </Button>
    </div>
  );
}
