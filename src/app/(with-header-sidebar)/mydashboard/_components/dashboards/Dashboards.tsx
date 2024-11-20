'use client';

import useDashboards from '../../_hooks/useDashboards';
import Pagination from './Pagination';
import DashboardCard from './DashboardCard';
import styles from './Dashboards.module.css';
import AddDashboardCard from './AddDashboardCard';

const PAGE_SIZE = 5;

export default function Dashboards() {
  const { page, dashboards, totalPages, handlePageChange } = useDashboards({
    pageSize: PAGE_SIZE,
  });

  return (
    <div>
      <section className={styles.dashboardsWrapper}>
        <AddDashboardCard />
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
