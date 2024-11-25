import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CardData } from '@/types/dashboardView';
import { useModal } from '@/app/(with-header-sidebar)/mydashboard/_hooks/useModal';
import Modal from '@/app/(with-header-sidebar)/mydashboard/_components/modal/Modal';
import CardDetail from './CardDetail';
import styles from './Card.module.css';

interface Props {
  item: CardData;
  index: number;
}

function Card({ item, index }: Props) {
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
        >
          <CardDetail closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default React.memo(Card);
