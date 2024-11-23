import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CardData } from '@/types/dashboardView';
import styles from './Card.module.css';

interface Props {
  item: CardData;
  index: number;
}

function Card({ item, index }: Props) {
  if (!item || !item.id) {
    return null;
  }

  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.card} ${snapshot.isDragging ? styles.dragging : ''}`}
        >
          <div>{item.title}</div>
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
