'use client';

import { useEffect } from 'react';
import PasswordForm from './_components/PasswordForm';
import ProfileForm from './_components/ProfileForm';
import useAuth from './_hooks/useAuth';
import styles from './page.module.css';

export default function MyPage() {
  const { login, getMe } = useAuth();

  const handleLoad = async () => {
    await login();
    await getMe();
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className={styles.page}>
      <ProfileForm />
      <PasswordForm />
    </div>
  );
}
