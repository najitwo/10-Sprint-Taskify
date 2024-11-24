'use client';

import { useRouter } from 'next/navigation';
import useIdStore from '@/store/idStore';
import Button from '@/components/Button';
import { deleteDashboard } from '@/lib/boardService';
import styles from './DeleteButton.module.css';

export default function DeleteButton() {
  const id = useIdStore((state) => state.id);
  const router = useRouter();

  const handleClick = async () => {
    await deleteDashboard(id);
    router.replace('/mydashboard');
  };

  return (
    <Button className={styles.button} onClick={handleClick}>
      대시보드 삭제하기
    </Button>
  );
}
