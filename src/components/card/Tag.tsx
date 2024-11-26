import { getDarkerColor, getRandomColor } from '@/utils/colorUtils';
import styles from './Tag.module.css';

interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  const mainColor = getRandomColor(name);
  const style = {
    backgroundColor: mainColor,
    color: getDarkerColor(mainColor),
  };

  return (
    <div style={style} className={styles.tag}>
      {name}
    </div>
  );
}
