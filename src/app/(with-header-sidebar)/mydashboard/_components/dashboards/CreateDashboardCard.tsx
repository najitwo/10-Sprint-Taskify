import Button from '@/components/Button';
import Image from 'next/image';
import { useModal } from '../../_hooks/useModal';
import Modal from '../modal/Modal';
import CreateDashboardForm from './CreateDashboardForm';
import styles from './CreateDashboardCard.module.css';

const TITLE = '새로운 대시보드';

export default function CreateDashboardCard() {
  const { isOpen, openModal, isClosing, closeModal } = useModal();

  return (
    <div>
      <Button className={styles.createDashboard} onClick={openModal}>
        <span>{TITLE}</span>
        <span className={styles.addIconWrapper}>
          <Image src="/icons/add.svg" alt={TITLE} width={16} height={16} />
        </span>
      </Button>
      {isOpen && (
        <Modal isClosing={isClosing} onClose={closeModal} title={TITLE}>
          <CreateDashboardForm />
        </Modal>
      )}
    </div>
  );
}
