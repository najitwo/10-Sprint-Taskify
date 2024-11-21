'use client';

import useIdStore from '@/store/idStore';
import useInvitation from '../_hooks/useInvitation';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import { Invitation } from '@/types/invitation';
import styles from './Invitations.module.css';
import useModalStore from '@/store/modalStore';
import InvitationModal from './InvitationModal';
import EmptyInvitations from './EmptyInvitations';

export default function Invitations() {
  const dashboardId = useIdStore((state) => state.id);
  const {
    page,
    invitations,
    totalPages,
    handlePageChange,
    handleCancel,
    handleInvite,
  } = useInvitation(dashboardId);
  const { openModal } = useModalStore();

  const handleOpenModal = () => {
    openModal(<InvitationModal handleInvite={handleInvite} />);
  };

  return (
    <div className={styles.container}>
      <ListHeader
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        onOpenModal={handleOpenModal}
      />
      {invitations.length > 0 ? (
        <ul className={styles.list}>
          {invitations.map(({ id, invitee }: Invitation) => (
            <ListItem
              key={id}
              invitee={invitee}
              onCancel={() => handleCancel(id)}
            />
          ))}
        </ul>
      ) : (
        <EmptyInvitations />
      )}
    </div>
  );
}
