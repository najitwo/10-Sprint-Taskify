'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SideBar.module.css';
import Image from 'next/image';
import Button from './Button';
import useWindowSize from '@/app/(with-header-sidebar)/mydashboard/hooks/useWindowSize';

export default function SideBar() {
  const pathname = usePathname();
  const { isMobile } = useWindowSize();

  return (
    <div className={styles.sideBar}>
      <Button aria-label="홈페이지 이동" className={styles.button}>
        {isMobile ? (
          <Image
            src="/images/logo_small.svg"
            alt="로고 홈페이지이동"
            width={24}
            height={27}
          />
        ) : (
          <Image
            src="/images/logo_large.svg"
            alt="로고 홈페이지이동"
            width={109}
            height={33}
          />
        )}
      </Button>
      <Button aria-label="대시보드 추가하기" className={styles.button}>
        <Image
          src="/icons/add_box.svg"
          alt="대시보드 추가하기"
          width={20}
          height={20}
        />
      </Button>
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
  );
}
