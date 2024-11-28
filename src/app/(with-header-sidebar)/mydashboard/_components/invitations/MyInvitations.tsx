'use client';

import Image from 'next/image';
import { ChangeEvent } from 'react';
import { useMyInvitations } from '../../_hooks/useMyInvitations';
import MyInvitationCard from './MyInvitationCard';
import MyInvitationHeader from './MyInvitationHeader';
import { useState } from 'react';
import SearchBar from './SearchBar';
import styles from './MyInvitations.module.css';

export default function MyInvitations() {
  const [title, setTitle] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const { myInvitations, isLoading, error, observerRef } = useMyInvitations(
    title,
    reloadKey
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  if (error) {
    return <div>공습경보🚨</div>;
  }

  const triggerReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <section className={styles.invitations}>
      <h2 className={styles.title}>초대받은 대시보드</h2>
      {myInvitations.length > 0 || title != null ? (
        <div>
          <div className={styles.searchBarWrapper}>
            <SearchBar title={title || ''} onChange={handleInputChange} />
          </div>
          <ul>
            {myInvitations.map((invitation, index) => (
              <li key={invitation.id} className={styles.myInvitation}>
                {index === 0 && <MyInvitationHeader />}
                <MyInvitationCard
                  {...invitation}
                  onActionComplete={triggerReload}
                />
              </li>
            ))}
          </ul>
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
