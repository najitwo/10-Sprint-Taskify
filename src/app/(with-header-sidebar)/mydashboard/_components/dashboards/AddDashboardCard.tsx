import Button from '@/components/Button';
import Image from 'next/image';
import styles from './AddDashboardCard.module.css';

export default function AddDashboardCard() {
  return (
    <Button className={styles.addDashboard}>
      <span>새로운 대시보드</span>
      <span className={styles.addIconWrapper}>
        <Image
          src="/icons/add.svg"
          alt="새로운 대시보드 추가"
          width={16}
          height={16}
        />
      </span>
    </Button>
  );
}
