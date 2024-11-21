'use client';

import useIdStore from '@/store/idStore';
import { Invitation } from '@/types/invitation';
import useInvitation from '../_hooks/useInvitation';
import styles from './Invitations.module.css';
import ListHeader from './ListHeader';
import ListItem from './ListItem';

export default function Invitations() {
  const dashboardId = useIdStore((state) => state.id);
  const { page, invitations, totalPages, handlePageChange, handleCancel } =
    useInvitation(dashboardId);

  return (
    <div className={styles.container}>
      <ListHeader
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      {invitations.length > 0 ? (
        <ul className={styles.list}>
          {invitations.map(({ id, invitee }: Invitation) => (
            <ListItem
              key={id}
              invitee={invitee}
              handleCancel={() => handleCancel(id)}
            />
          ))}
        </ul>
      ) : (
        <div>초대없음</div>
      )}
    </div>
  );
}
