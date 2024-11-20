import { ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from './layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
