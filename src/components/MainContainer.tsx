import { ReactNode } from 'react';
import Header from './header/Header';
import styles from './MainContainer.module.css';
import DashboardMembers from './header/DashboardMembers';

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <>
      <Header component={DashboardMembers} />
      <main className={styles.mainContainer}>{children}</main>
    </>
  );
}
