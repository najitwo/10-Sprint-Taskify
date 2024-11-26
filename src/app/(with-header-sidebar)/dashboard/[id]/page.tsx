'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { DragDropContext } from 'react-beautiful-dnd';
import useDashBoardView from './hooks/useDashBoardView';
import Column from './components/Column';
import Button from '@/components/Button';
import Image from 'next/image';
import useDashboardStore from '@/store/dashboardStore';
import styles from './page.module.css';

export default function DashBoardView() {
  const params = useParams();
  const id = params.id;

  const searchParams = useSearchParams();
  const color = searchParams.get('color') || 'var(--violet)';
  const { columns, loading, error, handleOnDragEnd, loadMoreData } =
    useDashBoardView(`${id}`);
  const dashboard = useDashboardStore((state) => state.dashboard);
  const setDashboard = useDashboardStore((state) => state.setDashboard);

  const searchParams = useSearchParams();
  const color = searchParams.get('color') || 'var(--violet)';
  const { columns, loading, error, handleOnDragEnd } = useDashBoardView(
    id as string
  );

  useEffect(() => {
    if (dashboard?.id !== Number(id)) {
      setDashboard(Number(id));
    }
  }, [id, dashboard?.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.dashboardView}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {columns.map((column) => (
          <Column
            key={column.id}
            color={color}
            title={column.title}
            totalCount={column.totalCount}
            id={column.id}
            items={column.items}
            loadMoreData={loadMoreData}
          />
        ))}
        <div className={styles.createColumnSection}>
          <Button type="button" className={styles.createColumn}>
            <span>새로운 칼럼 추가하기</span>
            <Image
              src="/icons/add.svg"
              width={22}
              height={22}
              alt=""
              className={styles.createColumnIcon}
            />
          </Button>
        </div>
      </DragDropContext>
    </div>
  );
}
