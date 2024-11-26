import styles from './ColumnLabel.module.css';
import Dot from '../Dot';

interface ColumnLabelProps {
  name: string;
}

export default function ColumnLabel({ name }: ColumnLabelProps) {
  return (
    <div className={styles.columnLabel}>
      <div>
        <Dot width="6px" height="6px" />
      </div>
      <span>{name}</span>
    </div>
  );
}
