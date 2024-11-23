import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import axiosInstance from '@/lib/axiosInstance';
import { DropResult } from 'react-beautiful-dnd';
import { ColumnData } from '@/types/dashboardView';
import { COLUMN_URL, CARD_URL } from '@/constants/urls';

export default function useDashBoardView(dashboardId: string | undefined) {
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);

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
        axiosInstance.get(
          `${CARD_URL}?size=10&columnId=${columnId}&cursor=${cursor || ''}`
        )
      );

      const cardResponses = await Promise.all(cardRequests);
      console.log(cardResponses[0].data.totalCount);

      const updatedColumns = columns.map(
        (column: ColumnData, index: number) => {
          const cardData = cardResponses[index].data.cards;
          const totalCount = cardResponses[index].data.totalCount;
          return {
            ...column,
            items: cardData || [],
            totalCount: totalCount || 0,
          };
        }
      );
      setColumns(updatedColumns);
      setCursor(cardResponses[0].data.cursor);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dashboardId, cursor]);
  //체크

  useEffect(() => {
    console.log('렌더링 체크');
    if (!dashboardId) return;

    fetchData();
  }, [fetchData, dashboardId, cursor]);
  //체크

  const sendCardUpdateRequest = useCallback(
    debounce(async (cardId: string, updatedCardData: object) => {
      try {
        const response = await axiosInstance.put(
          `${CARD_URL}/${cardId}`,
          updatedCardData
        );
        console.log('응답:', response);
        if (response.status === 200 || response.status === 204) {
          console.log('카드가 성공적으로 업데이트되었습니다.');
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      }
    }, 200),
    []
  );
  //체크

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

        console.log(updatedColumns[sourceColumnIndex].totalCount);
      }

      setColumns(updatedColumns);

      try {
        await sendCardUpdateRequest(`${removed.id}`, {
          ...removed,
          columnId: removed.columnId,
        });
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      }
    },
    [columns, sendCardUpdateRequest]
  );

  //체크

  return { columns, loading, error, handleOnDragEnd };
}
