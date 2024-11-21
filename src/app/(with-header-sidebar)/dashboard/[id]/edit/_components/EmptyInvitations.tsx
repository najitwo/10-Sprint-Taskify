import Image from 'next/image';
import styles from './EmptyInvitations.module.css';

export default function EmptyInvitations() {
  return (
    <div className={styles.container}>
      <Image
        src="/images/unsubscribe.svg"
        width={60}
        height={60}
        alt="비어있는 초대 내역"
      />
      <p className={styles.description}>아직 초대된 사람이 없어요</p>
    </div>
  );
}
