'use client';

import useIdStore from '@/store/idStore';
import useModalStore from '@/store/modalStore';
import useInvitation from '../_hooks/useInvitation';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import InvitationModal from './InvitationModal';
import EmptyInvitations from './EmptyInvitations';
import styles from './Invitations.module.css';

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
        title="초대 내역"
        subtitle="이메일"
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        onOpenModal={handleOpenModal}
      />
      {invitations.length > 0 ? (
        <ul className={styles.list}>
          {invitations.map(({ id, invitee }) => (
            <ListItem
              key={id}
              user={invitee}
              type="invitee"
              onDelete={() => handleCancel(id)}
            />
          ))}
        </ul>
      ) : (
        <EmptyInvitations />
      )}
    </div>
  );
}
