'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import { COLUMN_URL, CARD_URL } from '@/constants/urls';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import useDashboardStore from '@/store/dashboardStore';
import styles from './page.module.css';

interface Column {
  id: number;
  title: string;
  teamId?: string;
  createdAt?: string;
  updatedAt?: string;
  items: Card[];
}

interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

// interface CardResponse {
//   cursorId: number;
//   totalCount: number;
//   cards: Card[];
// }

export default function DashBoardView() {
  const { id } = useParams();
  const dashboard = useDashboardStore((state) => state.dashboard);
  const setDashboard = useDashboardStore((state) => state.setDashboard);

  const [columns, setColumns] = useState<Column[]>([]);
  // const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dashboard?.id !== Number(id)) {
      setDashboard(Number(id));
    }
  }, [id, dashboard?.id]);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    console.log(id);

    const fetchData = async (id: string) => {
      setLoading(true);
      try {
        const { data: columnData } = await axiosInstance.get(
          `${COLUMN_URL}?dashboardId=${id}`
        );

        const columns = columnData.data;

        const columnIds: number[] = columns.map((column: Column) => column.id);

        const cardRequests = columnIds.map((columnId) =>
          axiosInstance.get(`${CARD_URL}?size=10&columnId=${columnId}`)
        );

        const cardResponses = await Promise.all(cardRequests);

        const updatedColumns = columns.map((column: Column, index: number) => {
          const cardData = cardResponses[index].data.cards;
          return { ...column, items: cardData || [] };
        });

        setColumns(updatedColumns);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(id);
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceDroppableId = Number(source.droppableId);
    const destinationDroppableId = Number(destination.droppableId);

    if (sourceDroppableId === destinationDroppableId) {
      const columnIndex = columns.findIndex(
        (col) => col.id === sourceDroppableId
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
        (col) => col.id === sourceDroppableId
      );
      const destinationColumnIndex = columns.findIndex(
        (col) => col.id === destinationDroppableId
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
              droppableId={column.id.toString()}
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
                      draggableId={item.id.toString()}
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
                          {item.id}
                        </div>
                      )}
                    </Draggable>
                  ))}
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
