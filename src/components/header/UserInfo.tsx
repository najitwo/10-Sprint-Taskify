'use client';

import type { User } from '@/types/user';
import Image from 'next/image';
import UserInfoSkeleton from './skeleton/UserInfoSkeleton';
import Avatar from '../Avatar';
import styles from './UserInfo.module.css';

// TODO 로그인 로직 완료 후 user정보 가져오기
const user: User = {
  id: 1,
  email: 'heejin@gmail.com',
  nickname: 'heejin',
  profileImageUrl:
    // 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/10-1_4804_1731757528194.jpeg',
    null,
  createdAt: '2024-11-15T14:29:07.482Z',
};

export default function UserInfo() {
  const { nickname, profileImageUrl } = user;

  if (!nickname) {
    return <UserInfoSkeleton />;
  }

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
