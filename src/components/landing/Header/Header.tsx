import Link from 'next/link';
import CustomLogo from '@/components/CustomLogo';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/" aria-label="홈으로 이동">
          <CustomLogo className={styles.logo} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/login" className={styles.navLink}>
          로그인
        </Link>
        <Link href="/signup" className={styles.navLink}>
          회원가입
        </Link>
      </nav>
    </header>
  );
}
