'use client';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return <header className={styles.header}>헤더 {pathname}</header>;
}
