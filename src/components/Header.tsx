'use client';
import { usePathname } from 'next/navigation';
import type { User } from '@/app/(with-header-sidebar)/mydashboard/types/user';
import Image from 'next/image';
import Button from './Button';
import useWindowSize from '@/app/(with-header-sidebar)/mydashboard/hooks/useWindowSize';
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
  const { isMobile } = useWindowSize();

  const { nickname, profileImageUrl } = user;

  return (
    <header className={styles.header}>
      <span className={styles.title}>나의 대시보드</span>
      <div className={styles.buttonContainer}>
        <Button className={styles.button}>
          {!isMobile && (
            <Image
              src="/icons/settings.svg"
              alt="관리"
              width={20}
              height={20}
            />
          )}
          관리
        </Button>
        <Button className={styles.button}>
          {!isMobile && (
            <Image
              src="/icons/add_box.svg"
              alt="초대하기"
              width={20}
              height={20}
            />
          )}
          초대하기
        </Button>
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
