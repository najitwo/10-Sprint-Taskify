import More from '@/components/svg/More';
import type { Menu } from '@/types/menu';
import MenuDropdown from '@/components/MenuDropdown';
import { useMenu } from '@/hooks/useMenu';
import { deleteCard } from '@/lib/cardService';
import { useRouter } from 'next/navigation';
import useDashboardStore from '@/store/dashboardStore';
import useModalStore from '@/store/modalStore';
import UpdateTaskModal from '../UpdateTaskModal';
import styles from './HeaderMenu.module.css';

interface HeaderMenuProps {
  cardId: number;
  closeModal: () => void;
}

export default function HeaderMenu({ cardId, closeModal }: HeaderMenuProps) {
  const router = useRouter();
  const { dashboard } = useDashboardStore();
  const { isMenuVisible, toggleMenu } = useMenu();
  const { openModal } = useModalStore();

  const handleDeleteClick = async () => {
    await deleteCard(cardId);
    closeModal();
    router.replace(`/dashboard/${dashboard?.id}`);
  };

  const handleUpdateClick = () => {
    openModal(<UpdateTaskModal />);
  };

  const cardMenus: Menu[] = [
    { name: '수정하기', handleOnClick: handleUpdateClick },
    { name: '삭제하기', handleOnClick: handleDeleteClick },
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
