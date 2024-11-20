import Button from '@/components/Button';
import Image from 'next/image';
import styles from './AddDashboardCard.module.css';
import { useModal } from '../../_hooks/useModal';
import Modal from '../modal/Modal';
import AddDashboardContent from './AddDashboardForm';

const TITLE = '새로운 대시보드';

export default function AddDashboardCard() {
  const { isOpen, openModal, isClosing, closeModal } = useModal();

  return (
    <div>
      <Button className={styles.addDashboard} onClick={openModal}>
        <span>{TITLE}</span>
        <span className={styles.addIconWrapper}>
          <Image src="/icons/add.svg" alt={TITLE} width={16} height={16} />
        </span>
      </Button>
      {isOpen && (
        <Modal isClosing={isClosing} onClose={closeModal} title={TITLE}>
          <AddDashboardContent />
        </Modal>
      )}
    </div>
  );
}
