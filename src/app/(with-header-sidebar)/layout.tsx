import { ReactNode } from 'react';
import SideBar from '@/components/SideBar';
import styles from './layout.module.css';
import MainContainer from '@/components/MainContainer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <nav className={styles.sideBarWrapper}>
        <SideBar />
      </nav>
      <div className={styles.mainWrapper}>
        <MainContainer>{children}</MainContainer>
      </div>
    </div>
  );
}
