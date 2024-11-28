'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DragDropContext } from 'react-beautiful-dnd';
import useDashBoardView from './hooks/useDashBoardView';
import Column from './components/Column';
import Button from '@/components/Button';
import Image from 'next/image';
import useDashboardStore from '@/store/dashboardStore';
import { useModal } from '../../mydashboard/_hooks/useModal';
import Modal from '@/app/(with-header-sidebar)/mydashboard/_components/modal/Modal';
import CreateColumnModal from './components/CreateColumnModal';
import styles from './page.module.css';

export default function DashBoardView() {
  const { isOpen, openModal, isClosing, closeModal } = useModal();
  const params = useParams();
  const id = params.id;

  const { columns, loading, error, handleOnDragEnd, loadMoreData } =
    useDashBoardView(`${id}`);
  const dashboard = useDashboardStore((state) => state.dashboard);
  const setDashboard = useDashboardStore((state) => state.setDashboard);
  const color = useDashboardStore((state) => state.color);

  useEffect(() => {
    if (dashboard?.id !== Number(id)) {
      setDashboard(Number(id));
    }
  }, [id, dashboard?.id, columns]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const COLCOUNT = columns.length === 10;

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
      </DragDropContext>
      {!COLCOUNT && (
        <div className={styles.createColumnSection}>
          <Button
            type="button"
            className={styles.createColumn}
            onClick={openModal}
          >
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
      )}
      {isOpen && (
        <Modal isClosing={isClosing} onClose={closeModal} hasCloseButton={true}>
          <CreateColumnModal />
        </Modal>
      )}
    </div>
  );
}
