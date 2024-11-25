import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ColumnData } from '@/types/dashboardView';
import Button from '@/components/Button';
import Image from 'next/image';
import Card from './Card';
import styles from './Column.module.css';

function Column({ color, title, totalCount, id, items }: ColumnData) {
  return (
    <div className={styles.column}>
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

      <Droppable
        droppableId={`${id}`}
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={true}
        direction="vertical"
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.dropContext}
          >
            {items.map((item, index) =>
              item ? <Card key={item.id} item={item} index={index} /> : null
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default React.memo(Column);
