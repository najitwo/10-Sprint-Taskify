import More from '@/components/svg/More';
import { useState } from 'react';
import { Menu } from '@/types/menu';
import MenuDropdown from '@/components/MenuDropdown';
import styles from './HeaderMenu.module.css';

export default function HeaderMenu() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMoreClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const cardMenus: Menu[] = [
    {
      name: '수정하기',
      handleOnClick: () => console.log('수정하기 클릭'),
    },
    {
      name: '삭제하기',
      handleOnClick: () => console.log('삭제하기 클릭'),
    },
  ];

  return (
    <div className={styles.headerMenu}>
      <button type="button" onClick={handleMoreClick}>
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
