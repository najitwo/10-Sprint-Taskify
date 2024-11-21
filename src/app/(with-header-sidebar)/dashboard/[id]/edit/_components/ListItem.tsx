import { MouseEventHandler } from 'react';
import { Invitee } from '@/types/invitation';
import styles from './ListItem.module.css';
import Button from '@/components/Button';

interface ListItemProps {
  invitee: Invitee;
  handleCancel: MouseEventHandler<HTMLButtonElement>;
}

export default function ListItem({ invitee, handleCancel }: ListItemProps) {
  return (
    <li className={styles.item}>
      <span className={styles.content}>{invitee.email}</span>
      <Button className={styles.button} onClick={handleCancel}>
        취소
      </Button>
    </li>
  );
}
