import { MouseEventHandler } from 'react';
import Button from '@/components/Button';
import { Invitee } from '@/types/invitation';
import styles from './ListItem.module.css';

interface ListItemProps {
  invitee: Invitee;
  onCancel: MouseEventHandler<HTMLButtonElement>;
}

export default function ListItem({ invitee, onCancel }: ListItemProps) {
  return (
    <li className={styles.item}>
      <span className={styles.content}>{invitee.email}</span>
      <Button className={styles.button} onClick={onCancel}>
        취소
      </Button>
    </li>
  );
}
