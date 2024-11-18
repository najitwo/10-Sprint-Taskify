import type { Dashboard } from '@/app/(with-header-sidebar)/mydashboard/_types/dashboards';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import styles from './DashboardCard.module.css';

export default function DashboardCard({
  id,
  color,
  title,
  createdByMe,
}: Dashboard) {
  const router = useRouter();

  return (
    <Button
      className={styles.dashboardCard}
      onClick={() => router.push(`/dashboard/${id}`)}
    >
      <div className={styles.titleContainer}>
        <div style={{ background: color }} className={styles.dot}></div>
        <span className={styles.title}>{title}</span>
        {createdByMe && (
          <span className={styles.crown}>
            <Image src="/icons/crown.svg" alt="왕관" width={15} height={12} />
          </span>
        )}
        <div className={styles.arrowWrapper}>
          <Image
            src="/icons/arrow_right.svg"
            alt="오른쪽 화살표"
            width={18}
            height={18}
          />
        </div>
      </div>
    </Button>
  );
}
