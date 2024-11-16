import { ReactNode } from 'react';
import styles from './MainContainer.module.css';
import Header from './Header';

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
