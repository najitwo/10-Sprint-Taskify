import Image from 'next/image';
import Button from '@/components/Button';
import Pagination from './Pagination';
import styles from './ListHeader.module.css';

interface ListHeaderProps {
  totalPages: number;
  page: number;
  handlePageChange: (direction: 'next' | 'prev') => void;
}

export default function ListHeader({
  totalPages,
  page,
  handlePageChange,
}: ListHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>초대 내역</h2>
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
      <h4 className={styles.subtitle}>이메일</h4>
      <Button className={styles.button}>
        <Image
          src="/icons/add_box.svg"
          width={14}
          height={14}
          alt="초대하기"
          className={styles.addBox}
        />
        초대하기
      </Button>
    </div>
  );
}
