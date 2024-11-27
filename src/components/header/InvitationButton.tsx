import Image from 'next/image';
import Button from '../Button';
import useModalStore from '@/store/modalStore';
import useInvitation from '@/app/(with-header-sidebar)/dashboard/[id]/edit/_hooks/useInvitation';
import InvitationModal from '@/app/(with-header-sidebar)/dashboard/[id]/edit/_components/InvitationModal';
import styles from './InvitationButton.module.css';

export default function InvitationButton({
  dashboardId,
}: {
  dashboardId: number;
}) {
  const { openModal } = useModalStore();
  const { handleInvite } = useInvitation(dashboardId.toString());

  const handleOpenInvitationModal = () => {
    openModal(<InvitationModal handleInvite={handleInvite} />);
  };

  return (
    <Button className={styles.button} onClick={handleOpenInvitationModal}>
      <Image
        src="/icons/add_box.svg"
        alt="초대하기"
        width={20}
        height={20}
        className={styles.icon}
      />
      초대하기
    </Button>
  );
}
