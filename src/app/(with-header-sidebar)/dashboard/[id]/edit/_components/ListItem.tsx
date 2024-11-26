import { MouseEventHandler } from 'react';
import Button from '@/components/Button';
import { Member } from '@/types/member';
import { Invitee } from '@/types/invitation';
import styles from './ListItem.module.css';
import Avatar from '@/components/Avatar';
import Image from 'next/image';

interface ListItemProps {
  user: Member | Invitee;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

export default function ListItem({ user, onDelete }: ListItemProps) {
  const isOwner = 'isOwner' in user && user.isOwner;
  const showButton = !isOwner;

  return (
    <li className={styles.item}>
      {'isOwner' in user ? (
        <>
          <div className={styles.user}>
            <Avatar
              name={user.nickname}
              profileImageUrl={user.profileImageUrl}
            />
            <span className={styles.content}>{user.nickname}</span>
            {isOwner && (
              <Image
                src="/icons/crown.svg"
                height={14}
                width={18}
                alt="주인"
                className={styles.crown}
              />
            )}
          </div>
        </>
      ) : (
        <span className={styles.content}>{user.email}</span>
      )}
      {showButton && (
        <Button className={styles.button} onClick={onDelete}>
          {'isOwner' in user ? '삭제' : '취소'}
        </Button>
      )}
    </li>
  );
}
