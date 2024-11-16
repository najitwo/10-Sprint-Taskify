'use client';

import { useEffect } from 'react';
import PasswordForm from './components/PasswordForm';
import ProfileForm from './components/ProfileForm';
import useAuth from './hooks/useAuth';

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
    <>
      <ProfileForm />
      <PasswordForm />
    </>
  );
}
