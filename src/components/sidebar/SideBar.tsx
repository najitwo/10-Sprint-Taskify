'use client';

import Image from 'next/image';
import Button from '../Button';
import useWindowSize from '@/app/(with-header-sidebar)/mydashboard/_hooks/useWindowSize';
import Dashboards from './Dashboards';
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/(with-header-sidebar)/mydashboard/_hooks/useModal';
import Modal from '@/app/(with-header-sidebar)/mydashboard/_components/modal/Modal';
import CreateDashboardForm from '@/app/(with-header-sidebar)/mydashboard/_components/dashboards/CreateDashboardForm';
import styles from './SideBar.module.css';

const TITLE = '대시보드 추가하기';

export default function SideBar() {
  const { isMobile } = useWindowSize();
  const router = useRouter();

  const { isOpen, openModal, isClosing, closeModal } = useModal();

  return (
    <div className={styles.sideBar}>
      <Button
        aria-label="홈페이지 이동"
        className={styles.logo}
        onClick={() => router.push('/')}
      >
        {isMobile ? (
          <Image
            src="/images/logo_small.svg"
            alt="로고 홈페이지이동"
            width={24}
            height={27}
            priority
          />
        ) : (
          <Image
            src="/images/logo_large.svg"
            alt="로고 홈페이지이동"
            width={109}
            height={33}
            priority
          />
        )}
      </Button>
      <div className={styles.createDashboardContainer}>
        <span className={styles.createDashboardTitle}>Dash Boards</span>
        <Button
          aria-label={TITLE}
          className={styles.addButton}
          onClick={openModal}
        >
          <Image src="/icons/add_box.svg" alt={TITLE} width={20} height={20} />
        </Button>
        {isOpen && (
          <Modal isClosing={isClosing} onClose={closeModal} title={TITLE}>
            <CreateDashboardForm closeModal={closeModal} />
          </Modal>
        )}
      </div>
      <Dashboards />
    </div>
  );
}
