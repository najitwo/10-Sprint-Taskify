import Button from '@/components/Button';
import Image from 'next/image';
import styles from './AddDashboardCard.module.css';
import { useModal } from '../../_hooks/useModal';
import Modal from '../modal/Modal';

export default function AddDashboardCard() {
  const { isOpen, openModal, isClosing, closeModal } = useModal();

  return (
    <div>
      <Button className={styles.addDashboard} onClick={openModal}>
        <span>새로운 대시보드</span>
        <span className={styles.addIconWrapper}>
          <Image
            src="/icons/add.svg"
            alt="새로운 대시보드 추가"
            width={16}
            height={16}
          />
        </span>
      </Button>
      {isOpen && (
        <Modal
          isClosing={isClosing}
          onClose={closeModal}
          title="새로운 대시보드"
        >
          <p>hi</p>
          <div>hi2</div>
        </Modal>
      )}
    </div>
  );
}
