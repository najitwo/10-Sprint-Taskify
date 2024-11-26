'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../Button';
import UserInfo from './UserInfo';
import Title from './Title';
import styles from './Header.module.css';
import useDashboardStore from '@/store/dashboardStore';
import { Menu } from '@/types/menu';
import MenuDropdown from '../MenuDropdown';

interface HeaderProps {
  component?: React.ComponentType;
}

export default function Header({ component: Component }: HeaderProps) {
  const router = useRouter();
  const dashboard = useDashboardStore((state) => state.dashboard);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleUserInfoClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleSettingsClick = () => {
    router.push(`/dashboard/${dashboard?.id}/edit`);
  };

  const navigateTo = (href: string) => {
    router.push(href);
    handleUserInfoClick();
  };

  const myInfoMenus: Menu[] = [
    {
      name: '내 대시보드',
      handleOnClick: () => navigateTo('/mydashboard'),
    },
    {
      name: '내 정보',
      handleOnClick: () => navigateTo('/mypage'),
    },
    {
      name: '로그아웃',
      handleOnClick: () => navigateTo('/'),
    },
  ];

  return (
    <header className={styles.header}>
      <Title pathname={usePathname()} />
      <div className={styles.buttonContainer}>
        {dashboard?.createdByMe && (
          <Button className={styles.button} onClick={handleSettingsClick}>
            <Image
              src="/icons/settings.svg"
              alt="관리"
              width={20}
              height={20}
              className={styles.icon}
            />
            관리
          </Button>
        )}
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
        <Button className={styles.userInfoButton} onClick={handleUserInfoClick}>
          <UserInfo />
        </Button>
        {isMenuVisible && (
          <div className={styles.myMenu}>
            <MenuDropdown menus={myInfoMenus} />
          </div>
        )}
      </div>
    </header>
  );
}
