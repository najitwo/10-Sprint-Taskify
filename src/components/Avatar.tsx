import Image from 'next/image';
import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  profileImageUrl?: string | null;
  className?: string;
}

export default function Avatar({
  name,
  profileImageUrl = null,
  className = '',
}: AvatarProps) {
  const getRandomColor = (name: string) => {
    const hash = [...name].reduce(
      (acc, char) => acc + char.charCodeAt(0) * 31,
      0
    );
    const getValue = (offset: number) => (((hash >> offset) % 0xff) % 76) + 180;
    const red = getValue(0);
    const green = getValue(8);
    const blue = getValue(16);

    return `rgb(${red}, ${green}, ${blue})`;
  };

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
        <div
          className={`${styles.avatar} ${className}`}
          style={{ backgroundColor: `${getRandomColor(name)}` }}
        >
          {name[0].toUpperCase()}
        </div>
      )}
    </>
  );
}
