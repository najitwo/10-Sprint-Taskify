import More from '@/components/svg/More';
import type { Menu } from '@/types/menu';
import MenuDropdown from '@/components/MenuDropdown';
import { useMenu } from '@/hooks/useMenu';
import { deleteCard } from '@/lib/cardService';
import useModalStore from '@/store/modalStore';
import UpdateCardModal from '../UpdateCardModal';
import styles from './HeaderMenu.module.css';
import useTriggerStore from '@/store/triggerStore';
import useCardStore from '@/store/cardStore';

interface HeaderMenuProps {
  cardId: number;
  closeModal: () => void;
}

export default function HeaderMenu({ cardId, closeModal }: HeaderMenuProps) {
  const { updateTrigger } = useTriggerStore();
  const { isMenuVisible, toggleMenu } = useMenu();
  const { openModal } = useModalStore();

  const handleDeleteClick = async () => {
    await deleteCard(cardId);
    closeModal();
    useCardStore.getState().removeCard(cardId);
    updateTrigger.card();
  };

  const handleUpdateClick = () => {
    openModal(<UpdateCardModal cardId={cardId} />);
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
