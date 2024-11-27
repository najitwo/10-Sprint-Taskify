'use client';

import Image from 'next/image';
import UserInfoSkeleton from './skeleton/UserInfoSkeleton';
import Avatar from '../Avatar';
import styles from './UserInfo.module.css';
import useMe from '@/hooks/useMe';

export default function UserInfo() {
  const { user } = useMe();

  if (!user) {
    return <UserInfoSkeleton />;
  }

  const { nickname, profileImageUrl } = user;

  return (
    <>
      <div className={styles.userInfo}>
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt="프로필 이미지"
            width={30}
            height={30}
            className={styles.image}
          />
        ) : (
          <Avatar name={nickname} profileImageUrl={profileImageUrl} />
        )}
        <span className={styles.nickname}>{nickname}</span>
      </div>
    </>
  );
}
