import More from '@/components/svg/More';
import type { Menu } from '@/types/menu';
import MenuDropdown from '@/components/MenuDropdown';
import { useMenu } from '@/hooks/useMenu';
import styles from './HeaderMenu.module.css';

export default function HeaderMenu() {
  const { isMenuVisible, toggleMenu } = useMenu();

  const cardMenus: Menu[] = [
    { name: '수정하기', handleOnClick: () => console.log('수정하기 클릭') },
    { name: '삭제하기', handleOnClick: () => console.log('삭제하기 클릭') },
  ];

  return (
    <div className={styles.headerMenu}>
      <button type="button" onClick={toggleMenu} className={styles.moreButton}>
        <More />
      </button>
      {isMenuVisible && (
        <div className={styles.menuContainer}>
          <MenuDropdown menus={cardMenus} />
        </div>
      )}
    </div>
  );
}
