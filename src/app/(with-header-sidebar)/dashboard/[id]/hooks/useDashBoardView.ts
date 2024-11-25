import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import axiosInstance from '@/lib/axiosInstance';
import { DropResult } from 'react-beautiful-dnd';
import { ColumnData, CardData } from '@/types/dashboardView';
import { COLUMN_URL, CARD_URL } from '@/constants/urls';

export default function useDashBoardView(dashboardId: string | undefined) {
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cursors, setCursors] = useState<Record<number, number | null>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: columnData } = await axiosInstance.get(
        `${COLUMN_URL}?dashboardId=${dashboardId}`
      );

      const columns = columnData.data;
      const columnIds: number[] = columns.map(
        (column: ColumnData) => column.id
      );

      const cardRequests = columnIds.map((columnId) =>
        axiosInstance.get(`${CARD_URL}?size=10&columnId=${columnId}`)
      );

      const cardResponses = await Promise.all(cardRequests);

      const updatedColumns = columns.map(
        (column: ColumnData, index: number) => {
          const cardData = cardResponses[index].data.cards;
          const cursorId = cardResponses[index].data.cursorId;
          const totalCount = cardResponses[index].data.totalCount;

          return {
            ...column,
            items: cardData || [],
            totalCount: totalCount || 0,
          };
        }
      );

      const initialCursors = updatedColumns.reduce(
        (acc: Record<number, number | null>, column: ColumnData) => {
          const lastCard = column.items[column.items.length - 1];
          acc[column.id] = lastCard ? lastCard.id : null;
          return acc;
        },
        {} as Record<number, number | null>
      );

      setColumns(updatedColumns);
      setCursors(initialCursors);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dashboardId]);

  useEffect(() => {
    if (!dashboardId) return;
    fetchData();
  }, [fetchData, dashboardId]);

  const sendCardUpdateRequest = useCallback(
    debounce(async (cardId: string, updatedCardData: CardData) => {
      try {
        const response = await axiosInstance.put(
          `${CARD_URL}/${cardId}`,
          updatedCardData
        );
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      }
    }, 200),
    []
  );

  const handleOnDragEnd = useCallback(
    async (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) return;

      const sourceDroppableId = Number(source.droppableId);
      const destinationDroppableId = Number(destination.droppableId);

      let removed;
      const updatedColumns = [...columns];

      if (sourceDroppableId === destinationDroppableId) {
        const columnIndex = updatedColumns.findIndex(
          (col) => col.id === sourceDroppableId
        );
        const column = updatedColumns[columnIndex];
        const reorderedItems = Array.from(column.items);
        [removed] = reorderedItems.splice(source.index, 1);
        reorderedItems.splice(destination.index, 0, removed);
        updatedColumns[columnIndex].items = reorderedItems;
      } else {
        const sourceColumnIndex = updatedColumns.findIndex(
          (col) => col.id === sourceDroppableId
        );
        const destinationColumnIndex = updatedColumns.findIndex(
          (col) => col.id === destinationDroppableId
        );

        const sourceColumn = updatedColumns[sourceColumnIndex];
        const destinationColumn = updatedColumns[destinationColumnIndex];

        const sourceItems = Array.from(sourceColumn.items);
        [removed] = sourceItems.splice(source.index, 1);
        removed.columnId = destinationColumn.id;

        const destinationItems = Array.from(destinationColumn.items);
        destinationItems.splice(destination.index, 0, removed);

        updatedColumns[sourceColumnIndex].items = sourceItems;
        updatedColumns[destinationColumnIndex].items = destinationItems;

        updatedColumns[sourceColumnIndex].totalCount -= 1;
        updatedColumns[destinationColumnIndex].totalCount += 1;

        try {
          await sendCardUpdateRequest(`${removed.id}`, {
            ...removed,
            columnId: removed.columnId,
          });
        } catch (err) {
          if (err instanceof Error) setError(err.message);
        }
      }

      const updatedCursors = updatedColumns.reduce(
        (acc, column) => {
          const lastCard = column.items[column.items.length - 1];
          acc[column.id] = lastCard ? lastCard.id : null;
          return acc;
        },
        {} as Record<number, number | null>
      );

      setColumns(updatedColumns);
      setCursors(updatedCursors);
    },
    [columns, sendCardUpdateRequest]
  );

  const loadMoreData = useCallback(
    debounce(async (columnId: number) => {
      try {
        const currentCursor = cursors[columnId];

        if (currentCursor === null) return;

        const { data: cardResponses } = await axiosInstance.get(
          `${CARD_URL}?size=10&cursorId=${currentCursor}&columnId=${columnId}`
        );

        const newCards = cardResponses.cards;
        const newCursorId = cardResponses.cursorId;

        setColumns((prevColumns) =>
          prevColumns.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  items: [
                    ...column.items,
                    ...newCards.filter(
                      (newCard: CardData) =>
                        !column.items.some(
                          (prevCard) => prevCard.id === newCard.id
                        )
                    ),
                  ],
                }
              : column
          )
        );

        setCursors((prevCursors) => ({
          ...prevCursors,
          [columnId]: newCursorId || null,
        }));
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      }
    }, 200),
    [cursors]
  );

  return { columns, loading, error, handleOnDragEnd, loadMoreData };
}
