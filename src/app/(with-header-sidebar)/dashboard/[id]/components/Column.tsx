import React, { useRef, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DashboardColumn } from '@/types/dashboardView';
import Button from '@/components/Button';
import Image from 'next/image';
import Card from './Card';
import useModalStore from '@/store/modalStore';
import CreateTaskModal from './CreateCardModal';
import SettingsColumnModal from './SettingsColumnModal';
import styles from './Column.module.css';

function Column({
  color,
  title,
  totalCount,
  id,
  items,
  loadMoreData,
}: DashboardColumn) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const columnRef = useRef<HTMLDivElement | null>(null);
  const { openModal } = useModalStore();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && items.length < totalCount) {
          loadMoreData(id);
        }
      },
      {
        root: document.querySelector('.scrollContext'),
        threshold: 0.4,
      }
    );

    const loadMoreElement = loadMoreRef.current;

    if (totalCount === 0) return;

    if (loadMoreElement && observerRef.current && totalCount >= 10) {
      observerRef.current.observe(loadMoreElement);
    }

    return () => {
      if (loadMoreElement && observerRef.current) {
        observerRef.current.unobserve(loadMoreElement);
      }
    };
  }, [id, loadMoreData, totalCount]);

  const handleCreateTask = () => {
    openModal(<CreateTaskModal columnId={id} />);
  };

  const handleSettingsColumn = () => {
    openModal(<SettingsColumnModal title={title} id={id} />);
  };

  return (
    <div className={styles.column} ref={columnRef}>
      <div className={styles.header}>
        <div className={styles.status}>
          <div style={{ background: color }} className={styles.dot}></div>
          <div className={styles.title}>{title}</div>
          <div className={styles.totalCount}>{totalCount}</div>
        </div>

        <div className={styles.settingsWrapper}>
          <Button
            type="button"
            aria-label="컬럼 설정 버튼"
            className={styles.settings}
            onClick={handleSettingsColumn}
          >
            <Image src="/icons/settings.svg" width={24} height={24} alt="" />
          </Button>
        </div>
      </div>

      <div className={`${styles.columnContent}`}>
        <Button
          type="button"
          className={styles.createCard}
          aria-label="카드 생성 버튼"
          onClick={handleCreateTask}
        >
          <Image
            src="/icons/add.svg"
            width={22}
            height={22}
            alt=""
            className={styles.createCardIcon}
          />
        </Button>
        <div className={styles.scrollContext}>
          <Droppable
            droppableId={`${id}`}
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={true}
            direction="vertical"
          >
            {(provided, snapshot) => (
              <div
                className={`${styles.dropContext} ${
                  snapshot.isDraggingOver ? styles.dragOver : ''
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? 'var(--violet-light)'
                    : '',
                }}
              >
                {items.map((item, index) =>
                  item ? (
                    <Card
                      key={item.id}
                      item={item}
                      index={index}
                      columnTitle={title}
                    />
                  ) : null
                )}
                {provided.placeholder}
                <div ref={loadMoreRef} style={{ height: '5px' }}></div>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Column);
