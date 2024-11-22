'use client';

import Image from 'next/image';
import styles from './MyInvitations.module.css';
import { useMyInvitations } from '../../_hooks/useMyInvitations';
import Button from '@/components/Button';
import MyInvitationCard from './MyInvitationCard';

export default function MyInvitations() {
  const { myInvitations, isLoading, error, observerRef } = useMyInvitations();

  return (
    <section className={styles.invitations}>
      <h2 className={styles.title}>초대받은 대시보드</h2>
      {/* <div className={styles.descriptionWrapper}>
        <Image
          src="/images/unsubscribe.svg"
          alt="메일없음 이미지"
          width={100}
          height={100}
        />
        <p className={styles.description}>아직 초대받은 대시보드가 없어요</p>
      </div> */}
      <div>
        <div>searchbar</div>
        <div className={styles.invitationWrapper}>
          <div className={styles.header}>
            <span>이름</span>
            <span>초대자</span>
            <span>수락여부</span>
          </div>
          {myInvitations.map((invitation) => (
            <div key={invitation.id} className={styles.myInvitation}>
              <MyInvitationCard {...invitation} />
            </div>
          ))}
        </div>
        <div ref={observerRef} style={{ height: '1px' }}></div>
      </div>
    </section>
  );
}
