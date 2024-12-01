import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Footer from './Footer/Footer';
import styles from './layout.module.css';

const Header = dynamic(() => import('./Header/Header'), { ssr: false });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
