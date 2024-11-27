'use client';

import PasswordForm from './_components/PasswordForm';
import ProfileForm from './_components/ProfileForm';
import styles from './page.module.css';

export default function MyPage() {
  return (
    <div className={styles.page}>
      <ProfileForm />
      <PasswordForm />
    </div>
  );
}
