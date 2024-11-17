import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type {
  Dashboard,
  GetDashboardsResponse,
} from '@/app/(with-header-sidebar)/mydashboard/_types/dashboards';
import styles from './Dashboards.module.css';
import useApi from '@/app/(with-header-sidebar)/mydashboard/_hooks/useApi';
import Image from 'next/image';

export default function Dashboards() {
  const { data } = useApi<GetDashboardsResponse>('/dashboards', {
    method: 'GET',
    params: { navigationMethod: 'infiniteScroll', page: 1, size: 10 },
  });

  const dashboards = data?.dashboards ?? [];

  return (
    <div className={styles.dashboards}>
      <ul className={styles.dashboardsWrapper}>
        {dashboards.map((board) => (
          <DashboardItem key={board.id} {...board} />
        ))}
      </ul>
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
