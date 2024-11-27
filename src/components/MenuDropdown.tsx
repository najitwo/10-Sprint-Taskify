import type { Menu } from '@/types/menu';
import styles from './MenuDropdown.module.css';

interface MenuDropdownProps {
  menus: Menu[];
}

export default function MenuDropdown({ menus }: MenuDropdownProps) {
  return (
    <div className={styles.menuDropdown}>
      {menus.map((menu, index) => (
        <button
          key={index}
          onClick={menu.handleOnClick}
          type="button"
          className={styles.button}
        >
          {menu.name}
        </button>
      ))}
    </div>
  );
}
