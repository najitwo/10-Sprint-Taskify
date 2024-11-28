'use client';

import { useEffect } from 'react';
import useDashboardStore from '@/store/dashboardStore';
import Dashboards from './_components/dashboards/Dashboards';
import MyInvitations from './_components/invitations/MyInvitations';
import styles from './page.module.css';

export default function Page() {
  const { setDashboard } = useDashboardStore();

  useEffect(() => {
    setDashboard(null);
  }, []);

  return (
    <div className={styles.mydashboard}>
      <Dashboards />
      <MyInvitations />
    </div>
  );
}
