import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Cards } from '@/types/dashboardView';
import { useModal } from '@/app/(with-header-sidebar)/mydashboard/_hooks/useModal';
import Modal from '@/app/(with-header-sidebar)/mydashboard/_components/modal/Modal';
import CardInfo from './card-detail/CardInfo';
import HeaderMenu from './card-detail/HeaderMenu';
import Image from 'next/image';
import styles from './Card.module.css';

interface Props {
  item: Cards;
  index: number;
  columnTitle: string;
}

function Card({ item, index, columnTitle }: Props) {
  const { isOpen, openModal, isClosing, closeModal } = useModal();

  if (!item || !item.id) {
    return null;
  }

  const { id, title, imageUrl } = item;
  return (
    <>
      <Draggable draggableId={`${id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${styles.card} ${snapshot.isDragging ? styles.dragging : ''}`}
            onClick={openModal}
          >
            {imageUrl && (
              <div className={styles.imageWrapper}>
                <Image
                  src={imageUrl}
                  alt="할일카드 첨부이미지"
                  fill
                  className={styles.image}
                />
              </div>
            )}
            <div className={styles.title}>{title}</div>
          </div>
        )}
      </Draggable>
      {isOpen && (
        <Modal
          isClosing={isClosing}
          onClose={closeModal}
          title={title}
          hasCloseButton={true}
          headerComponent={() => (
            <HeaderMenu closeModal={closeModal} cardId={id} />
          )}
        >
          <CardInfo card={item} columnTitle={columnTitle} />
        </Modal>
      )}
    </>
  );
}

export default React.memo(Card);
