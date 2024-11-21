'use client';

import Image from 'next/image';
import styles from './MyInvitations.module.css';
import { useMyInvitations } from '../../_hooks/useMyInvitations';
import Button from '@/components/Button';

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
        <div>
          {myInvitations.map((invitation) => (
            <div key={invitation.id}>
              <div style={{ height: '100px' }}>{invitation.id}</div>
              <div style={{ height: '100px' }}>
                {invitation.dashboard.title}
              </div>
              <div style={{ height: '100px' }}>
                {invitation.inviter.nickname}
              </div>
              <div style={{ height: '100px' }}>
                <Button>수락</Button>
              </div>
              <div style={{ height: '100px' }}>
                <Button>거절</Button>
              </div>
            </div>
          ))}
        </div>
        <div ref={observerRef} style={{ height: '1px' }}></div>
      </div>
    </section>
  );
}
