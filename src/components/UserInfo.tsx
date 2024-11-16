'use client';

import type { User } from '@/app/(with-header-sidebar)/mydashboard/types/user';
import styles from './UserInfo.module.css';
import Image from 'next/image';
import useWindowSize from '@/app/(with-header-sidebar)/mydashboard/hooks/useWindowSize';
import { useState, useEffect } from 'react';
import UserInfoSkeleton from './skeleton/UserInfoSkeleton';

const user: User = {
  id: 1,
  email: 'heejin@gmail.com',
  nickname: 'heejin',
  // profileImageUrl:
  // 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/10-1_4804_1731757528194.jpeg',
  profileImageUrl: null,
  createdAt: '2024-11-15T14:29:07.482Z',
};

export default function UserInfo() {
  const { email, nickname, profileImageUrl } = user;
  const { isMobile } = useWindowSize();

  const [colors, setColors] = useState<{
    randomColor: string;
    invertedColor: string;
  } | null>(null);

  useEffect(() => {
    const { randomColor, invertedColor } = getRandomColor();
    setColors({ randomColor, invertedColor });
  }, []);

  if (!colors) {
    return <UserInfoSkeleton />;
  }

  return (
    <>
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          alt="프로필 이미지"
          width={30}
          height={30}
          className={styles.image}
        />
      ) : (
        <div className={styles.userInfo}>
          <div
            style={{
              backgroundColor: colors.randomColor,
              color: colors.invertedColor,
            }}
            className={styles.userIcon}
          >
            <span>{email[0].toUpperCase()}</span>
          </div>
          {!isMobile && <span className={styles.nickname}>{nickname}</span>}
        </div>
      )}
    </>
  );
}

function getRandomColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const r = parseInt(randomColor.slice(1, 3), 16);
  const g = parseInt(randomColor.slice(3, 5), 16);
  const b = parseInt(randomColor.slice(5, 7), 16);

  const invertedColor = `rgb(${255 - r}, ${255 - g}, ${255 - b})`;

  return { randomColor, invertedColor };
}
