import type { CardData } from '@/types/dashboardView';
import Avatar from '@/components/Avatar';
import { formatDateToCustomFormat } from '@/utils/dateUtils';
import styles from './Assignment.module.css';

interface AssignmentProps {
  card: Pick<CardData, 'dueDate' | 'assignee'>;
}

export default function Assignment({ card }: AssignmentProps) {
  if (!card) return null;

  const { assignee, dueDate } = card;

  return (
    <section className={styles.assignment}>
      <dl className={styles.wrapper}>
        {assignee && (
          <div className={styles.assignee}>
            <dt className={styles.label}>담당자</dt>
            <dd className={styles.avatarContainer}>
              <Avatar
                name={assignee.nickname}
                profileImageUrl={assignee.profileImageUrl}
                className={styles.avatar}
              />
              <span>{assignee.nickname}</span>
            </dd>
          </div>
        )}
        {dueDate && (
          <div className={styles.dueDate}>
            <dt className={styles.label}>마감일</dt>
            <dd className={styles.description}>
              {formatDateToCustomFormat(dueDate)}
            </dd>
          </div>
        )}
      </dl>
    </section>
  );
}
