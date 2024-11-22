import { MouseEventHandler } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Pagination from './Pagination';
import styles from './ListHeader.module.css';

interface ListHeaderProps {
  title: string;
  subtitle: string;
  totalPages: number;
  page: number;
  handlePageChange: (direction: 'next' | 'prev') => void;
  onOpenModal?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function ListHeader({
  title,
  subtitle,
  totalPages,
  page,
  handlePageChange,
  onOpenModal,
  className = '',
}: ListHeaderProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.pageInfo}>
          <span>
            {totalPages} 페이지 중 {page}
          </span>
          <Pagination
            className={styles.pagination}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {totalPages > 0 && <h4 className={styles.subtitle}>{subtitle}</h4>}
      {subtitle === '이메일' && (
        <Button className={styles.button} onClick={onOpenModal}>
          <Image
            src="/icons/add_box.svg"
            width={14}
            height={14}
            alt="초대하기"
            className={styles.addBox}
          />
          초대하기
        </Button>
      )}
    </div>
  );
}
