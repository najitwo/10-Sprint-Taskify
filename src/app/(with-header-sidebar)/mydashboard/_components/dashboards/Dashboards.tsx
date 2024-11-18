'use client';

import useDashboards from '../../_hooks/useDashboards';
import Pagination from './Pagination';
import styles from './Dashboards.module.css';
import DashboardCard from './DashboardCard';
import Button from '../Button';
import Image from 'next/image';

const PAGE_SIZE = 5;

export default function Dashboards() {
  const { page, dashboards, totalPages, handlePageChange } = useDashboards({
    pageSize: PAGE_SIZE,
  });

  return (
    <div>
      <section className={styles.dashboardsWrapper}>
        <Button className={styles.addDashboard}>
          <span>새로운 대시보드</span>
          <span className={styles.addIconWrapper}>
            <Image
              src="/icons/add.svg"
              alt="새로운 대시보드 추가"
              width={16}
              height={16}
            />
          </span>
        </Button>
        {dashboards.map((board) => (
          <DashboardCard key={board.id} {...board} />
        ))}
      </section>
      {dashboards.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
