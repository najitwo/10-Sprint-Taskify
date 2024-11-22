import Button from '@/components/Button';
import type { Invitation } from '@/types/invitation';
import styles from './MyInvitationCard.module.css';

export default function MyInvitationCard({ dashboard, inviter }: Invitation) {
  return (
    <div className={styles.myInvitationCard}>
      <div className={styles.myInvitationContainer}>
        <div className={`${styles.infoWrapper} ${styles.title}`}>
          <span className={styles.label}>이름</span>
          <span className={styles.info}>{dashboard.title}</span>
        </div>
        <div className={`${styles.infoWrapper} ${styles.nickname}`}>
          <span className={styles.label}>초대자</span>
          <span className={styles.info}>{inviter.nickname}</span>
        </div>
        <div className={styles.buttonWrapper}>
          <Button className={styles.btnAccept}>수락</Button>
          <Button className={styles.btnDecline}>거절</Button>
        </div>
      </div>
    </div>
  );
}
