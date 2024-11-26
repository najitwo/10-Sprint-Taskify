import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import type { CardData } from '@/types/dashboardView';
import { useModal } from '@/app/(with-header-sidebar)/mydashboard/_hooks/useModal';
import Modal from '@/app/(with-header-sidebar)/mydashboard/_components/modal/Modal';
import CardInfo from './card-detail/CardInfo';
import HeaderMenu from './card-detail/HeaderMenu';
import styles from './Card.module.css';

interface Props {
  item: CardData;
  index: number;
  columnTitle: string;
}

function Card({ item, index, columnTitle }: Props) {
  const { isOpen, openModal, isClosing, closeModal } = useModal();

  if (!item || !item.id) {
    return null;
  }

  return (
    <>
      <Draggable draggableId={`${item.id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${styles.card} ${snapshot.isDragging ? styles.dragging : ''}`}
            onClick={openModal}
          >
            <div>{item.title}</div>
          </div>
        )}
      </Draggable>
      {isOpen && (
        <Modal
          isClosing={isClosing}
          onClose={closeModal}
          title={item.title}
          hasCloseButton={true}
          headerComponent={() => (
            <HeaderMenu closeModal={closeModal} cardId={item.id} />
          )}
        >
          <CardInfo card={item} columnTitle={columnTitle} />
        </Modal>
      )}
    </>
  );
}

export default React.memo(Card);
