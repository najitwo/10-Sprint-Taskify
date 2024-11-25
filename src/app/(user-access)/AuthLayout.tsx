'use client';

import React from 'react';
import styles from './AuthLayout.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  return (
    <div className={styles.authContainer}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/logo_main.svg"
          alt="로고"
          width={100}
          height={100}
          className={styles.logo}
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className={styles.authContent}>{children}</div>
    </div>
  );
}
