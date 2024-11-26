import React, { useRef, useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Columns } from '@/types/dashboardView';
import Button from '@/components/Button';
import Image from 'next/image';
import Card from './Card';
import styles from './Column.module.css';

function Column({
  color,
  title,
  totalCount,
  id,
  items,
  loadMoreData,
}: Columns) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [minHeight, setMinHeight] = useState<string>('auto');

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
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
  }, [id, loadMoreData]);

  useEffect(() => {
    if (items.length === 0 || items.length <= 5) {
      setMinHeight('866px');
    } else {
      setMinHeight('auto');
    }
  }, [items]);

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
          >
            <Image src="/icons/settings.svg" width={24} height={24} alt="" />
          </Button>
        </div>
      </div>

      <div className={styles.createCardSection}>
        <Button
          type="button"
          className={styles.createCard}
          aria-label="컬럼 생성 버튼"
        >
          <Image
            src="/icons/add.svg"
            width={22}
            height={22}
            alt=""
            className={styles.createCardIcon}
          />
        </Button>
      </div>

      <div className={styles.scrollContext}>
        <Droppable
          droppableId={`${id}`}
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping={true}
          direction="vertical"
        >
          {(provided) => (
            <div
              className={styles.dropContext}
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight }}
            >
              {items.map((item, index) =>
                item ? <Card key={item.id} item={item} index={index} /> : null
              )}

              {provided.placeholder}

              <div ref={loadMoreRef} style={{ height: '1px' }} />
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default React.memo(Column);
