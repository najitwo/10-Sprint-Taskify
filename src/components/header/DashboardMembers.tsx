'use client';

import { getMembers } from '@/app/(with-header-sidebar)/dashboard/[id]/edit/_lib/memberService';
import { useEffect, useState } from 'react';
import { Member } from '@/types/member';
import useDashboardStore from '@/store/dashboardStore';
import Avatar from '../Avatar';
import styles from './DashboardMembers.module.css';
import useWindowSize from '@/app/(with-header-sidebar)/mydashboard/_hooks/useWindowSize';

const sampleMembers: Member[] = [
  {
    id: 1,
    email: 'johndoe@example.com',
    nickname: '김희진',
    profileImageUrl: null,
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-10T12:00:00Z',
    isOwner: true,
    userId: 101,
  },
  {
    id: 2,
    email: 'janedoe@example.com',
    nickname: 'JaneDoe',
    profileImageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/10-1_4804_1731757528194.jpeg',
    createdAt: '2024-11-02T11:00:00Z',
    updatedAt: '2024-11-12T14:00:00Z',
    isOwner: false,
    userId: 102,
  },
  {
    id: 3,
    email: 'alice@example.com',
    nickname: 'Alice',
    profileImageUrl: null,
    createdAt: '2024-11-03T12:00:00Z',
    updatedAt: '2024-11-13T15:00:00Z',
    isOwner: false,
    userId: 103,
  },
  {
    id: 4,
    email: 'bob@example.com',
    nickname: 'Bob',
    profileImageUrl: null,
    createdAt: '2024-11-04T13:00:00Z',
    updatedAt: '2024-11-14T16:00:00Z',
    isOwner: false,
    userId: 104,
  },
  {
    id: 5,
    email: 'bob@example.com',
    nickname: 'Bob',
    profileImageUrl: null,
    createdAt: '2024-11-04T13:00:00Z',
    updatedAt: '2024-11-14T16:00:00Z',
    isOwner: false,
    userId: 104,
  },
  {
    id: 6,
    email: 'bob@example.com',
    nickname: 'Park',
    profileImageUrl: null,
    createdAt: '2024-11-04T13:00:00Z',
    updatedAt: '2024-11-14T16:00:00Z',
    isOwner: false,
    userId: 104,
  },
  {
    id: 7,
    email: 'bob@example.com',
    nickname: 'Jin',
    profileImageUrl: null,
    createdAt: '2024-11-04T13:00:00Z',
    updatedAt: '2024-11-14T16:00:00Z',
    isOwner: false,
    userId: 104,
  },
  {
    id: 8,
    email: 'bob@example.com',
    nickname: 'Nick',
    profileImageUrl: null,
    createdAt: '2024-11-04T13:00:00Z',
    updatedAt: '2024-11-14T16:00:00Z',
    isOwner: false,
    userId: 104,
  },
  {
    id: 9,
    email: 'bob@example.com',
    nickname: 'Garlic',
    profileImageUrl: null,
    createdAt: '2024-11-04T13:00:00Z',
    updatedAt: '2024-11-14T16:00:00Z',
    isOwner: false,
    userId: 104,
  },
  {
    id: 10,
    email: 'Marry',
    nickname: 'Bob',
    profileImageUrl: null,
    createdAt: '2024-11-04T13:00:00Z',
    updatedAt: '2024-11-14T16:00:00Z',
    isOwner: false,
    userId: 104,
  },
];

export default function DashboardMembers() {
  const dashboard = useDashboardStore((state) => state.dashboard);
  // const [members, setMembers] = useState<Member[]>([]);
  const [members, setMembers] = useState<Member[]>(sampleMembers);
  const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //   if (!dashboard) return;

  //   async function fetchMembers() {
  //     try {
  //       const response = await getMembers(dashboard!.id.toString());
  //       setMembers(response.members);
  //       setTotalPages(response.totalCount);
  //     } catch (error) {
  //       console.error('Error fetching members:', error);
  //     }
  //   }

  //   fetchMembers();
  // }, [dashboard]);
  const { isMobile } = useWindowSize();
  const maxViewCount = isMobile ? 3 : 5;

  return members.length > 0 ? (
    <div className={styles.avatarWrapper}>
      {members
        .slice(
          0,
          members.length === maxViewCount ? maxViewCount : maxViewCount - 1
        )
        .map(({ id, nickname, profileImageUrl }) => (
          <Avatar
            key={id}
            name={nickname}
            profileImageUrl={profileImageUrl}
            className={styles.avatar}
          />
        ))}
      {members.length > maxViewCount && (
        <Avatar
          name={members.length - maxViewCount + 1}
          className={styles.avatarNumber}
        />
      )}
    </div>
  ) : null;
}
