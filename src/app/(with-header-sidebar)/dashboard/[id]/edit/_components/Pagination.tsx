import Image from 'next/image';
import Button from '@/components/Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (direction: 'next' | 'prev') => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className={`${styles.arrowWrapper} ${className}`}>
      <Button
        className={styles.arrowLeft}
        onClick={() => onPageChange('prev')}
        disabled={isFirstPage}
      >
        <Image
          src={
            isFirstPage
              ? '/icons/arrow_left_light.svg'
              : '/icons/arrow_left.svg'
          }
          alt="왼쪽으로 이동"
          width={16}
          height={16}
        />
      </Button>
      <Button
        className={styles.arrowRight}
        onClick={() => onPageChange('next')}
        disabled={isLastPage}
      >
        <Image
          src={
            isLastPage
              ? '/icons/arrow_right_light.svg'
              : '/icons/arrow_right.svg'
          }
          alt="오른쪽으로 이동"
          width={16}
          height={16}
        />
      </Button>
    </div>
  );
}
