'use client';

import Image from 'next/image';
import styles from './MyInvitations.module.css';
import { useMyInvitations } from '../../_hooks/useMyInvitations';

export default function MyInvitations() {
  const { myInvitations, isLoading, error } = useMyInvitations();
  console.log(myInvitations);

  return (
    <section className={styles.invitations}>
      <h2 className={styles.title}>초대받은 대시보드</h2>
      <div className={styles.descriptionWrapper}>
        <Image
          src="/images/unsubscribe.svg"
          alt="메일없음 이미지"
          width={100}
          height={100}
        />
        <p className={styles.description}>아직 초대받은 대시보드가 없어요</p>
      </div>
    </section>
  );
}
