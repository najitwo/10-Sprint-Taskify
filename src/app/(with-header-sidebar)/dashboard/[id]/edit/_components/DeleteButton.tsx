'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { deleteDashboard } from '@/lib/boardService';
import styles from './DeleteButton.module.css';
import useDashboardStore from '@/store/dashboardStore';

export default function DeleteButton() {
  const { dashboard, setDashboard } = useDashboardStore();
  const router = useRouter();

  const handleClick = async () => {
    await deleteDashboard(dashboard!.id.toString());
    setDashboard(null);
    router.replace('/mydashboard');
  };

  return (
    <Button className={styles.button} onClick={handleClick}>
      대시보드 삭제하기
    </Button>
  );
}
