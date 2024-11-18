import { ReactNode } from 'react';
import Header from './header/Header';
import styles from './MainContainer.module.css';

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
