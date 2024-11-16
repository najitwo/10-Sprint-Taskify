'use client';
import { usePathname } from 'next/navigation';
import type { User } from '@/app/(with-header-sidebar)/mydashboard/types/user';
import Button from './Button';
import styles from './Header.module.css';

const user: User = {
  id: 1,
  email: 'heejin@gmail.com',
  nickname: 'heejin',
  profileImageUrl: null,
  createdAt: '2024-11-15T14:29:07.482Z',
};

interface HeaderProps {
  component: React.ComponentType;
}

export default function Header({ component: Component }: HeaderProps) {
  const pathname = usePathname();

  const { nickname, profileImageUrl } = user;

  return (
    <header className={styles.header}>
      <span className={styles.title}>나의 대시보드</span>
      <div className={styles.buttonContainer}>
        <Button className={styles.button}>관리</Button>
        <Button className={styles.button}>초대하기</Button>
      </div>
      {Component && (
        <div>
          <Component />
        </div>
      )}
      <div>userInfo</div>
    </header>
  );
}
