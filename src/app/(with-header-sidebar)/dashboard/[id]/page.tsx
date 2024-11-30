'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DragDropContext } from 'react-beautiful-dnd';
import useDashBoardView from './hooks/useDashBoardView';
import Column from './components/Column';
import Button from '@/components/Button';
import Image from 'next/image';
import useDashboardStore from '@/store/dashboardStore';
import useModalStore from '@/store/modalStore';
import CreateColumnModal from './components/CreateColumnModal';
import useTriggerStore from '@/store/triggerStore';
import styles from './page.module.css';

const DEFAULT_COLOR = 'var(--violet)';

export default function DashBoardView() {
  const { openModal } = useModalStore();
  const { trigger } = useTriggerStore();
  const params = useParams();
  const id = params.id;

  const { columns, loading, error, handleOnDragEnd, loadMoreData, fetchData } =
    useDashBoardView(`${id}`);
  const { dashboard, setDashboard } = useDashboardStore();

  useEffect(() => {
    if (dashboard?.id !== Number(id)) {
      setDashboard(Number(id));
    }
  }, [id, dashboard?.id]);

  useEffect(() => {
    if (!dashboard) return;
    fetchData();
  }, [dashboard, trigger]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const COlUMN_COUNT = columns.length >= 9;

  const handleCreateColumn = () => {
    openModal(<CreateColumnModal />);
  };

  return (
    <div className={styles.dashboardView}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {columns.map((column) => (
          <Column
            key={column.id}
            color={dashboard?.color || DEFAULT_COLOR}
            title={column.title}
            totalCount={column.totalCount}
            id={column.id}
            items={column.items}
            loadMoreData={loadMoreData}
          />
        ))}
      </DragDropContext>
      {!COlUMN_COUNT && (
        <div className={styles.createColumnSection}>
          <Button
            type="button"
            className={styles.createColumn}
            onClick={handleCreateColumn}
          >
            <span>새로운 컬럼 추가하기</span>
            <Image
              src="/icons/add.svg"
              width={22}
              height={22}
              alt=""
              className={styles.createColumnIcon}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
