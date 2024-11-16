'use client';

import styles from './page.module.css';
import Link from 'next/link';
import Logo from '/public/images/logo.svg';
import EmailIcon from '/public/icons/email.svg';
import FacebookIcon from '/public/icons/facebook.svg';
import InstagramIcon from '/public/icons/instagram.svg';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" aria-label="홈으로 이동">
          <Logo className={styles.logo} alt="로고" />
        </Link>

        <nav className={styles.nav}>
          <Link href="/login" className={styles.navLink}>
            로그인
          </Link>
          <Link href="/signup" className={styles.navLink}>
            회원가입
          </Link>
        </nav>
      </header>

      <main className={styles.main}></main>

      <footer className={styles.footer}>
        <div>©codeit - 2023</div>
        <div className={styles.legalLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className={styles.socialLinks}>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="이메일 바로가기"
          >
            <EmailIcon aria-hidden="true" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="페이스북 바로가기"
          >
            <FacebookIcon aria-hidden="true" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="인스타그램 바로가기"
          >
            <InstagramIcon aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
