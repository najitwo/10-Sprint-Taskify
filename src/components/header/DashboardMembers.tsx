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
  const { isMobile } = useWindowSize();

  const { members, totalCount } = useMember(
    dashboard?.id.toString() || null,
    MEMBERS_VIEW_COUNT.desktop
  );

  if (totalCount === 0) {
    return null;
  }

  const maxViewCount = isMobile
    ? MEMBERS_VIEW_COUNT.mobile
    : MEMBERS_VIEW_COUNT.desktop;

  return (
    <div className={styles.avatarWrapper}>
      {members
        .slice(0, totalCount > maxViewCount ? maxViewCount - 1 : maxViewCount)
        .map(({ id, nickname, profileImageUrl }) => (
          <Avatar
            key={id}
            name={nickname}
            profileImageUrl={profileImageUrl}
            className={styles.avatar}
          />
        ))}
      {totalCount > maxViewCount && (
        <Avatar
          name={totalCount - maxViewCount + 1}
          className={styles.avatarNumber}
        />
      )}
    </div>
  );
}
