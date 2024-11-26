import { ReactNode } from 'react';
import SideBar from '@/components/sidebar/SideBar';
import MainContainer from '@/components/MainContainer';
import Modal from '@/app/(with-header-sidebar)/mypage/_components/Modal';
import styles from './layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <nav className={styles.sideBarWrapper}>
        <SideBar />
      </nav>
      <div className={styles.mainWrapper}>
        <MainContainer>{children}</MainContainer>
      </div>
      <Modal />
    </div>
  );
}
