'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import styles from './page.module.css';

const initialColumns = [
  {
    id: 'col-1',
    title: 'To do',
    items: [
      { id: '1', content: '아이템 1' },
      { id: '2', content: '아이템 2' },
    ],
  },
  {
    id: 'col-2',
    title: 'On Progress',
    items: [
      { id: '3', content: '아이템 3' },
      { id: '4', content: '아이템 4' },
    ],
  },
  {
    id: 'col-3',
    title: 'Done',
    items: [
      { id: '5', content: '아이템 5' },
      { id: '6', content: '아이템 6' },
    ],
  },
];

export default function DashBoardView() {
  const { id } = useParams();
  const [columns, setColumns] = useState(() => initialColumns);
  useEffect(() => {
    if (id) {
      setColumns(initialColumns);
    }
  }, [id]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const columnIndex = columns.findIndex(
        (col) => col.id === source.droppableId
      );
      const column = columns[columnIndex];
      const reorderedItems = Array.from(column.items);
      const [removed] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, removed);

      const newColumns = [...columns];
      newColumns[columnIndex].items = reorderedItems;
      setColumns(newColumns);
    } else {
      const sourceColumnIndex = columns.findIndex(
        (col) => col.id === source.droppableId
      );
      const destinationColumnIndex = columns.findIndex(
        (col) => col.id === destination.droppableId
      );

      const sourceColumn = columns[sourceColumnIndex];
      const destinationColumn = columns[destinationColumnIndex];

      const sourceItems = Array.from(sourceColumn.items);
      const [removed] = sourceItems.splice(source.index, 1);

      const destinationItems = Array.from(destinationColumn.items);
      destinationItems.splice(destination.index, 0, removed);

      const newColumns = [...columns];
      newColumns[sourceColumnIndex].items = sourceItems;
      newColumns[destinationColumnIndex].items = destinationItems;

      setColumns(newColumns);
    }
  };

  return (
    <div className={styles.dashboardView}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {columns.map((column) => (
          <div key={column.id} className={styles.column}>
            <div>{column.title}</div>
            <Droppable
              droppableId={column.id}
              // 하위 옵션 없을 경우 에러
              isDropDisabled={false}
              isCombineEnabled={false}
              ignoreContainerClipping={true}
              direction="vertical"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.context}
                >
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                          className={`${styles.card} ${snapshot.isDragging ? styles.dragging : ''}`}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {/* <div className={styles.placeholder}>
                    {provided.placeholder}
                  </div> */}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}
