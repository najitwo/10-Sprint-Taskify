'use client';

import Image from 'next/image';
import styles from './MyInvitations.module.css';
import { useMyInvitations } from '../../_hooks/useMyInvitations';
import MyInvitationCard from './MyInvitationCard';

export default function MyInvitations() {
  const { myInvitations, isLoading, error, observerRef } = useMyInvitations();

  if (error) {
    return <div>공습경보🚨</div>;
  }

  return (
    <section className={styles.invitations}>
      <h2 className={styles.title}>초대받은 대시보드</h2>
      {myInvitations.length > 0 ? (
        <div>
          <div>searchbar</div>
          <div className={styles.invitationWrapper}>
            {myInvitations.map((invitation) => (
              <div key={invitation.id} className={styles.myInvitation}>
                <MyInvitationCard {...invitation} />
              </div>
            ))}
          </div>
          <div ref={observerRef} style={{ height: '1px' }}></div>
        </div>
      ) : (
        <div className={styles.descriptionWrapper}>
          <Image
            src="/images/unsubscribe.svg"
            alt="메일없음 이미지"
            width={100}
            height={100}
          />
          <p className={styles.description}>아직 초대받은 대시보드가 없어요</p>
        </div>
      )}
    </section>
  );
}
