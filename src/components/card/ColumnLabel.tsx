import styles from './ColumnLabel.module.css';
import Dot from '../svg/Dot';

interface ColumnLabelProps {
  name: string;
}

export default function ColumnLabel({ name }: ColumnLabelProps) {
  return (
    <div className={styles.columnLabel}>
      <div>
        <Dot width="6" height="6" />
      </div>
      <span>{name}</span>
    </div>
  );
}