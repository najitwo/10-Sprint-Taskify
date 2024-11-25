'use client';

import useDashboardStore from '@/store/dashboardStore';
import Avatar from '../Avatar';
import useWindowSize from '@/app/(with-header-sidebar)/mydashboard/_hooks/useWindowSize';
import useMember from '@/app/(with-header-sidebar)/dashboard/[id]/edit/_hooks/useMember';
import styles from './DashboardMembers.module.css';

const MEMBERS_VIEW_COUNT = {
  mobile: 3,
  desktop: 5,
};

export default function DashboardMembers() {
  const dashboard = useDashboardStore((state) => state.dashboard);

  const { members, totalPages } = useMember(dashboard!.id.toString(), 5);

  const { isMobile } = useWindowSize();
  const maxViewCount = isMobile
    ? MEMBERS_VIEW_COUNT.mobile
    : MEMBERS_VIEW_COUNT.desktop;

  return totalPages > 0 ? (
    <div className={styles.avatarWrapper}>
      {members
        .slice(0, totalPages > maxViewCount ? maxViewCount - 1 : maxViewCount)
        .map(({ id, nickname, profileImageUrl }) => (
          <Avatar
            key={id}
            name={nickname}
            profileImageUrl={profileImageUrl}
            className={styles.avatar}
          />
        ))}
      {totalPages > maxViewCount && (
        <Avatar
          name={totalPages - maxViewCount + 1}
          className={styles.avatarNumber}
        />
      )}
    </div>
  ) : null;
}
