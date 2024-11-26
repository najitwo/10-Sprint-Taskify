import { getDarkerColor, getRandomColor } from '@/utils/colorUtils';
import styles from './Tag.module.css';

interface TagProps {
  name: string;
  className?: string;
  onClick?: VoidFunction;
}

export default function Tag({ name, className, onClick }: TagProps) {
  const mainColor = getRandomColor(name);
  const style = {
    backgroundColor: mainColor,
    color: getDarkerColor(mainColor),
  };

  return (
    <div
      style={style}
      className={`${styles.tag} ${className}`}
      onClick={onClick}
    >
      {name}
    </div>
  );
}
