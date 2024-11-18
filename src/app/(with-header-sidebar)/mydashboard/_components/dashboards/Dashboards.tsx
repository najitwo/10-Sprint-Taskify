'use client';

import useDashboards from '../../_hooks/useDashboards';
import Pagination from './Pagination';
import styles from './Dashboards.module.css';
import DashboardCard from './DashboardCard';

const PAGE_SIZE = 5;

export default function Dashboards() {
  const { page, dashboards, totalPages, handlePageChange } = useDashboards({
    pageSize: PAGE_SIZE,
  });

  return (
    <div>
      <section className={styles.dashboardsWrapper}>
        {dashboards.map((board) => (
          <DashboardCard key={board.id} {...board} />
        ))}
      </section>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
