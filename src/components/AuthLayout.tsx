'use client';

import React from 'react';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authContainer}>{children}</div>
    </div>
  );
}
