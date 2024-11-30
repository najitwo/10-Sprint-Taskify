import Button from '@/components/Button';
import type {
  Invitation,
  AcceptMyInvitationRequestBody,
} from '@/types/invitation';
import { updateMyInvitation } from '../../_lib/myInvitationService';
import { toast } from '@/store/toastStore';
import styles from './MyInvitationCard.module.css';

interface MyInvitationCardProps extends Invitation {
  onActionComplete: () => void;
}

export default function MyInvitationCard({
  id,
  dashboard,
  inviter,
  onActionComplete,
}: MyInvitationCardProps) {
  const handleOnClick = async (id: number, inviteAccepted: boolean) => {
    const requestBody: AcceptMyInvitationRequestBody = { inviteAccepted };
    await updateMyInvitation({ invitationId: id, requestBody });
    toast.success({ message: `${inviteAccepted ? '수락' : '거절'} 완료!` });
    onActionComplete();
  };

  return (
    <div className={styles.myInvitationCard}>
      <div className={styles.myInvitationContainer}>
        <div className={`${styles.infoWrapper} ${styles.title}`}>
          <span className={styles.label}>이름</span>
          <span className={styles.info}>{dashboard.title}</span>
        </div>
        <div className={`${styles.infoWrapper} ${styles.nickname}`}>
          <span className={styles.label}>초대자</span>
          <span className={styles.info}>{inviter.nickname}</span>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            className={styles.btnAccept}
            onClick={() => handleOnClick(id, true)}
          >
            수락
          </Button>
          <Button
            className={styles.btnDecline}
            onClick={() => handleOnClick(id, false)}
          >
            거절
          </Button>
        </div>
      </div>
    </div>
  );
}
