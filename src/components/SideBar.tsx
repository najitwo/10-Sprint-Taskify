'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SideBar.module.css';

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div>
      <Link
        href={'/dashboard/1'}
        className={`link ${pathname === '/dashboard/1' ? styles.active : ''}`}
      >
        대시보드1
      </Link>
      <Link
        href={'/dashboard/2'}
        className={`link ${pathname === '/dashboard/2' ? styles.active : ''}`}
      >
        대시보드2
      </Link>
    </div>
  );
}
