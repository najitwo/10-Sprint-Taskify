import UserInfo from './UserInfo';
import Button from '../Button';
import type { Menu } from '@/types/menu';
import { useMenu } from '@/hooks/useMenu';
import { useRouter } from 'next/navigation';
import MenuDropdown from '../MenuDropdown';
import styles from './UserSection.module.css';
import useMe from '@/hooks/useMe';

export default function UserSection() {
  const router = useRouter();
  const { clearUser } = useMe();
  const { isMenuVisible, toggleMenu, closeMenu } = useMenu();

  const navigateTo = (href: string) => {
    router.push(href);
    closeMenu();
  };

  const handleLogout = () => {
    clearUser();
    router.replace('/');
  };

  const myInfoMenus: Menu[] = [
    { name: '내 대시보드', handleOnClick: () => navigateTo('/mydashboard') },
    { name: '내 정보', handleOnClick: () => navigateTo('/mypage') },
    { name: '로그아웃', handleOnClick: handleLogout },
  ];

  return (
    <div className={styles.userInfoContainer}>
      <Button className={styles.userInfoButton} onClick={toggleMenu}>
        <UserInfo />
      </Button>
      {isMenuVisible && (
        <div className={styles.myMenu}>
          <MenuDropdown menus={myInfoMenus} />
        </div>
      )}
    </div>
  );
}
