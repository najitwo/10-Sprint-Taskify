'use client';

import useIdStore from '@/store/idStore';
import useMember from '../_hooks/useMember';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './Members.module.css';

export default function Members() {
  const dashboardId = useIdStore((state) => state.id);
  const { page, members, totalPages, handlePageChange, handleDelete } =
    useMember(dashboardId);

  return (
    <div className={styles.container}>
      <ListHeader
        title="구성원"
        subtitle="이름"
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        className={styles.header}
      />
      <ul className={styles.list}>
        {members.map((member) => (
          <ListItem
            key={member.id}
            user={member}
            onDelete={() => handleDelete(member.id)}
          />
        ))}
      </ul>
    </div>
  );
}
