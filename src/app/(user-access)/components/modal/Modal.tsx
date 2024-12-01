import useModalStore from '../../modalStore/modalStore';
import Button from '@/components/Button';
import styles from './Modal.module.css';
import { useRouter } from 'next/navigation';

interface AlertModalProps {
  message: string;
}

const AlertModal = ({ message }: AlertModalProps) => {
  const { closeModal, messageType } = useModalStore();
  const router = useRouter();

  const handleConfirm = () => {
    closeModal();
    if (messageType === 'success') {
      router.push('/login');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.messageContainer}>
        <p className={styles.message}>{message}</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={handleConfirm} className={styles.button}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default AlertModal;
