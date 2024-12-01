'use client';

import Link from 'next/link';
import { CustomSymbol, CustomTypo } from '@/components/CustomLogo';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getGradientColor = () => {
    const scrollPercent = Math.min(scroll / window.innerHeight, 1);

    const red = Math.floor(255 - (255 - 85) * scrollPercent);
    const green = Math.floor(255 - (255 - 52) * scrollPercent);
    const blue = Math.floor(255 - (255 - 218) * scrollPercent);

    const color = `rgb(${red}, ${green}, ${blue})`;

    return color;
  };

  return (
    <header className={styles.header}>
      <div>
        <Link href="/" aria-label="홈으로 이동">
          <div className={styles.logoWrapper}>
            <CustomSymbol
              className={styles.logoSymbol}
              fill={getGradientColor()}
            />
            <CustomTypo className={styles.logoTypo} fill={getGradientColor()} />
          </div>
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
