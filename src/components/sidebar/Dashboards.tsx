import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { GetDashboardsResponse } from '@/app/(with-header-sidebar)/mydashboard/_types/dashboards';
import styles from './Dashboards.module.css';
import useApi from '@/app/(with-header-sidebar)/mydashboard/_hooks/useApi';

export default function Dashboards() {
  const pathname = usePathname();

  const { data } = useApi<GetDashboardsResponse>('/dashboards', {
    method: 'GET',
    params: { navigationMethod: 'infiniteScroll', page: 1, size: 10 },
  });

  const dashboards = data?.dashboards;

  return (
    <div className={styles.dashBoards}>
      {dashboards &&
        dashboards.map((board) => (
          <Link
            key={board.id}
            href={`/dashboard/${board.id}`}
            className={`link ${pathname === '/dashboard/' + board.id ? styles.active : ''}`}
          >
            {board.title}
          </Link>
        ))}
    </div>
  );
}
