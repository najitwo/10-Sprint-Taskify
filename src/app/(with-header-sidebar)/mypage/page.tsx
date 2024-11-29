'use client';

import { useEffect } from 'react';
import useDashboardStore from '@/store/dashboardStore';
import PasswordForm from './_components/PasswordForm';
import ProfileForm from './_components/ProfileForm';
import styles from './page.module.css';

export default function MyPage() {
  const { setDashboard } = useDashboardStore();

  useEffect(() => {
    setDashboard(null);
  }, []);

  return (
    <div className={styles.page}>
      <ProfileForm />
      <PasswordForm />
    </div>
  );
}
