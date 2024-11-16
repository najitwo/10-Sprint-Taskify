'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from './Button';
import useWindowSize from '@/app/(with-header-sidebar)/mydashboard/hooks/useWindowSize';
import styles from './SideBar.module.css';

export default function SideBar() {
  const pathname = usePathname();
  const { isMobile } = useWindowSize();

  return (
    <div className={styles.sideBar}>
      <Button aria-label="홈페이지 이동" className={styles.logo}>
        {isMobile ? (
          <Image
            src="/images/logo_small.svg"
            alt="로고 홈페이지이동"
            width={24}
            height={27}
            priority
          />
        ) : (
          <Image
            src="/images/logo_large.svg"
            alt="로고 홈페이지이동"
            width={109}
            height={33}
            priority
          />
        )}
      </Button>
      <div className={styles.dashBoardsContainer}>
        <span className={styles.addDashBoardsTitle}>Dash Boards</span>
        <Button aria-label="대시보드 추가하기" className={styles.addButton}>
          <Image
            src="/icons/add_box.svg"
            alt="대시보드 추가하기"
            width={20}
            height={20}
          />
        </Button>
      </div>
      <div className={styles.dashboardsContainer}>
        <Link
          href={'/dashboard/1'}
          className={`link ${pathname === '/dashboard/1' ? styles.active : ''}`}
        >
          O
        </Link>
        <Link
          href={'/dashboard/2'}
          className={`link ${pathname === '/dashboard/2' ? styles.active : ''}`}
        >
          O
        </Link>
      </div>
    </div>
  );
}
