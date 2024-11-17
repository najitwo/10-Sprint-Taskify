'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '../Button';
import UserInfo from './UserInfo';
import styles from './Header.module.css';

interface HeaderProps {
  component?: React.ComponentType;
}

export default function Header({ component: Component }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>내 대시보드</h2>
      <div className={styles.buttonContainer}>
        <Button className={styles.button}>
          <Image
            src="/icons/settings.svg"
            alt="관리"
            width={20}
            height={20}
            className={styles.icon}
          />
          관리
        </Button>
        <Button className={styles.button}>
          <Image
            src="/icons/add_box.svg"
            alt="초대하기"
            width={20}
            height={20}
            className={styles.icon}
          />
          초대하기
        </Button>
      </div>
      {Component && (
        <div>
          <Component />
        </div>
      )}
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfoWrapper}>
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
