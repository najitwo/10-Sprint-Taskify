'use client';

import useIdStore from '@/store/idStore';
import { Invitation } from '@/types/invitation';
import Pagination from './Pagination';
import useInvitation from '../_hooks/useInvitation';
import styles from './Invitations.module.css';

export default function Invitations() {
  const id = useIdStore((state) => state.id);
  const { page, invitations, totalPages, handlePageChange } = useInvitation(id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>초대 내역</h2>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className={styles.list}>
        {invitations.length > 0 ? (
          invitations.map(({ id, invitee }: Invitation) => (
            <div key={id}>{invitee.email}</div>
          ))
        ) : (
          <div>초대없음</div>
        )}
      </div>
    </div>
  );
}
