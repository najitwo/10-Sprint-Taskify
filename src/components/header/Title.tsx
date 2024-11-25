import useDashboardStore from '@/store/dashboardStore';
import styles from './Title.module.css';
import Image from 'next/image';

interface TitleProps {
  pathname: string;
}

export default function Title({ pathname }: TitleProps) {
  const pathSegments = pathname.split('/');
  const firstSegment = pathSegments[1];

  const dashboard = useDashboardStore((state) => state.dashboard);

  switch (firstSegment) {
    case 'mypage':
      return <h2 className={styles.title}>계정관리</h2>;
    case 'mydashboard':
      return <h2 className={styles.title}>내 대시보드</h2>;
    case 'dashboard':
      const { title, createdByMe } = dashboard!;
      return (
        <div className={styles.dashboardTitleContainer}>
          <h2 className={styles.dashboardTitle}>{title}</h2>
          {createdByMe && (
            <span className={styles.crown}>
              <Image src="/icons/crown.svg" alt="왕관" width={15} height={12} />
            </span>
          )}
        </div>
      );
    default:
      return <h2 className={styles.title}>TITLE</h2>;
  }
}
