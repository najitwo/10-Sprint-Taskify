import styles from './MyInvitationHeader.module.css';

export default function MyInvitationHeader() {
  return (
    <div className={styles.myInvitationCard}>
      <div className={styles.myInvitationContainer}>
        <div className={`${styles.infoWrapper} ${styles.title}`}>
          <span className={styles.info}>이름</span>
        </div>
        <div className={`${styles.infoWrapper} ${styles.nickname}`}>
          <span className={styles.info}>초대자</span>
        </div>
        <div className={styles.buttonWrapper}>
          <span>수락여부</span>
        </div>
      </div>
    </div>
  );
}
