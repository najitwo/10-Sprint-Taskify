'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../Button';
import Title from './Title';
import useDashboardStore from '@/store/dashboardStore';
import UserSection from './UserSection';
import styles from './Header.module.css';
import InvitationButton from './InvitationButton';

interface HeaderProps {
  component?: React.ComponentType;
}

export default function Header({ component: Component }: HeaderProps) {
  const router = useRouter();
  const dashboard = useDashboardStore((state) => state.dashboard);

  const handleSettingsClick = () => {
    router.push(`/dashboard/${dashboard?.id}/edit`);
  };

  return (
    <header className={styles.header}>
      <Title pathname={usePathname()} />
      <div className={styles.buttonContainer}>
        {dashboard?.createdByMe && (
          <Button className={styles.button} onClick={handleSettingsClick}>
            <Image
              src="/icons/settings.svg"
              alt="관리"
              width={20}
              height={20}
              className={styles.icon}
            />
            관리
          </Button>
        )}
        {dashboard && <InvitationButton dashboardId={dashboard.id} />}
      </div>
      {Component && (
        <div>
          <Component />
        </div>
      )}
      <UserSection />
    </header>
  );
}
