'use client';

import styles from './page.module.css';
import dynamic from 'next/dynamic';

const Logo = dynamic(() => import('../../public/images/logo_large.svg'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <div>
          <Logo aria-hidden="true" />
        </div>
        <nav></nav>
      </header>

      <main>
        <section></section>
        <section></section>
        <section></section>
      </main>

      <footer>
        <div></div>
        <div></div>
        <div></div>
      </footer>
    </div>
  );
}
