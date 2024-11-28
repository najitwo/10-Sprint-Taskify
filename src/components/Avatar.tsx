import Image from 'next/image';
import styles from './Avatar.module.css';
import { getRandomColor } from '@/utils/colorUtils';

interface AvatarProps {
  name: string | number;
  profileImageUrl?: string | null;
  className?: string;
}

export default function Avatar({
  name,
  profileImageUrl = null,
  className = '',
}: AvatarProps) {
  const avatarStyle =
    typeof name === 'number'
      ? undefined
      : { backgroundColor: getRandomColor(name) };

  return (
    <>
      {profileImageUrl ? (
        <div className={`${styles.avatar} ${className}`}>
          <Image
            src={profileImageUrl}
            alt="프로필 이미지"
            fill
            className={styles.image}
          />
        </div>
      ) : (
        <div className={`${styles.avatar} ${className}`} style={avatarStyle}>
          {typeof name === 'number' ? `+${name}` : name[0].toUpperCase()}
        </div>
      )}
    </>
  );
}
