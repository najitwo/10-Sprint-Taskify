import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Cards } from '@/types/dashboardView';
import { useModal } from '@/app/(with-header-sidebar)/mydashboard/_hooks/useModal';
import Modal from '@/app/(with-header-sidebar)/mydashboard/_components/modal/Modal';
import CardInfo from './card-detail/CardInfo';
import HeaderMenu from './card-detail/HeaderMenu';
import Image from 'next/image';
import Tag from '@/components/card/Tag';
import CalendarIcon from '/public/icons/calendar.svg';
import Avatar from '@/components/Avatar';
import useCardStore from '@/store/cardStore';
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

  useCardStore.getState().setCard(item);
  const { id, title, imageUrl, tags, dueDate, assignee } = item;

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
            <div className={styles.cardContainer}>
              <div className={styles.imageContainer}>
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
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.contentContainer}>
                  <div className={styles.tagContainer}>
                    {tags.map((tag, index) => (
                      <Tag key={index} name={tag} />
                    ))}
                  </div>
                  <div className={styles.optionalInfo}>
                    <div className={styles.dueDateWrapper}>
                      {dueDate && (
                        <>
                          <CalendarIcon className={styles.icon} />
                          <span className={styles.dueDate}>{dueDate}</span>
                        </>
                      )}
                    </div>
                    {assignee && (
                      <Avatar
                        name={assignee.nickname}
                        className={styles.avatar}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
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
          className={styles.modal}
        >
          <CardInfo card={item} columnTitle={columnTitle} />
        </Modal>
      )}
    </>
  );
}

export default React.memo(Card);
