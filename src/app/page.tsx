'use client';

import styles from './page.module.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Logo = dynamic(() => import('../../public/images/logo_large.svg'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <div>
          <Link href="/" aria-label="홈으로 이동">
            <Logo aria-hidden="true" />
          </Link>
        </div>
        <nav>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </nav>
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
