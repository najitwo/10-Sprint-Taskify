'use client';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import type { User } from '@/app/(with-header-sidebar)/mydashboard/types/user';

const user: User = {
  id: 1,
  email: 'heejin@gmail.com',
  nickname: 'heejin',
  profileImageUrl: null,
  createdAt: '2024-11-15T14:29:07.482Z',
};

export default function Header() {
  const pathname = usePathname();

  const { nickname, profileImageUrl } = user;

  return <header className={styles.header}>내 대시보드</header>;
}
