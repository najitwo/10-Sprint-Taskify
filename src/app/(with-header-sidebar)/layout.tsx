import { ReactNode } from 'react';
import SideBar from '@/components/SideBar';
import styles from './layout.module.css';
import Header from '@/components/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <nav>
        <SideBar />
      </nav>
      <main>{children}</main>
    </>
  );
}
