import styles from './UserInfoSkeleton.module.css';

export default function UserInfoSkeleton() {
  return (
    <div className={styles.userInfo}>
      <div className={styles.userIcon} />
      <span className={styles.nickname}></span>
    </div>
  );
}
