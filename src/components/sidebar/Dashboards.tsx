import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Dashboard } from '@/app/(with-header-sidebar)/mydashboard/_types/dashboards';
import Image from 'next/image';
import Button from '../Button';
import styles from './Dashboards.module.css';
import useDashboards from '@/app/(with-header-sidebar)/mydashboard/_hooks/useDashboards';

const PAGE_SIZE = 12;

export default function Dashboards() {
  const { page, dashboards, totalPages, handlePageChange } = useDashboards({
    pageSize: PAGE_SIZE,
  });

  if (dashboards.length === 0) {
    return null;
  }

  return (
    <div className={styles.dashboards}>
      <ul className={styles.dashboardsWrapper}>
        {dashboards.map((board) => (
          <DashboardItem key={board.id} {...board} />
        ))}
      </ul>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function DashboardItem({ id, color, title, createdByMe }: Dashboard) {
  const isActive = usePathname() === `/dashboard/${id}`;

  return (
    <li>
      <Link
        href={`/dashboard/${id}`}
        className={`link ${isActive ? styles.active : ''}`}
      >
        <div className={styles.titleContainer}>
          <div style={{ background: color }} className={styles.dot}></div>
          <span className={styles.title}>{title}</span>
          {createdByMe && (
            <span className={styles.crown}>
              <Image src="/icons/crown.svg" alt="왕관" width={15} height={12} />
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}

function Pagination({
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
  );
}
