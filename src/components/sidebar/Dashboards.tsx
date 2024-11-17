import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type {
  Dashboard,
  GetDashboardsResponse,
} from '@/app/(with-header-sidebar)/mydashboard/_types/dashboards';
import useApi from '@/app/(with-header-sidebar)/mydashboard/_hooks/useApi';
import Image from 'next/image';
import Button from '../Button';
import { useState } from 'react';
import styles from './Dashboards.module.css';

const PAGE_SIZE = 12;

export default function Dashboards() {
  const [page, setPage] = useState(1);
  const { data } = useApi<GetDashboardsResponse>('/dashboards', {
    method: 'GET',
    params: { navigationMethod: 'pagination', page, size: PAGE_SIZE },
  });

  const dashboards = data?.dashboards ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handlePageChange = (direction: 'next' | 'prev') => {
    setPage((prevPage) => {
      if (direction === 'next' && prevPage < totalPages) return prevPage + 1;
      if (direction === 'prev' && prevPage > 1) return prevPage - 1;
      return prevPage;
    });
  };

  return (
    <div className={styles.dashboards}>
      <DashboardList dashboards={dashboards} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function DashboardList({ dashboards }: { dashboards: Dashboard[] }) {
  return (
    <ul className={styles.dashboardsWrapper}>
      {dashboards.map((board) => (
        <DashboardItem key={board.id} {...board} />
      ))}
    </ul>
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
