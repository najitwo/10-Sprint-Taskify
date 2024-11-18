import Image from 'next/image';
import Button from '../Button';
import styles from './Pagination.module.css';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (direction: 'next' | 'prev') => void;
}) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div>
      <span>{`${totalPages} 페이지 중 ${currentPage}`}</span>
      <div className={styles.arrowWrapper}>
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
    </div>
  );
}
