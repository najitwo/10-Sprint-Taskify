'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../Button';
import UserInfo from './UserInfo';
import styles from './Header.module.css';
import { useState } from 'react';

interface HeaderProps {
  component?: React.ComponentType;
}

export default function Header({ component: Component }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleUserInfoClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const navigateTo = (href: string) => {
    router.push(href);
    handleUserInfoClick();
  };

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
        <div className={styles.userInfoWrapper} onClick={handleUserInfoClick}>
          <UserInfo />
        </div>
        {isMenuVisible && (
          <div className={styles.myMenu}>
            <div onClick={() => navigateTo('/mydashboard')}>내 대시보드</div>
            <div onClick={() => navigateTo('/mypage')}>내 정보</div>
            <div onClick={() => navigateTo('/')}>로그아웃</div>
          </div>
        )}
      </div>
    </header>
  );
}
