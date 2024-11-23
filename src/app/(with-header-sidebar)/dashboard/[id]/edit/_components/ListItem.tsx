import { MouseEventHandler } from 'react';
import Button from '@/components/Button';
import { Member } from '@/types/member';
import { Invitee } from '@/types/invitation';
import styles from './ListItem.module.css';
import Avatar from '@/components/Avatar';

interface ListItemProps {
  user: Member | Invitee;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

export default function ListItem({ user, onDelete }: ListItemProps) {
  return (
    <li className={styles.item}>
      {'profileImageUrl' in user ? (
        <>
          <div className={styles.user}>
            <Avatar name={user.nickname} />
            <span className={styles.content}>{user.nickname}</span>
          </div>
          <Button className={styles.button} onClick={onDelete}>
            삭제
          </Button>
        </>
      ) : (
        <>
          <span className={styles.content}>{user.email}</span>
          <Button className={styles.button} onClick={onDelete}>
            취소
          </Button>
        </>
      )}
    </li>
  );
}
