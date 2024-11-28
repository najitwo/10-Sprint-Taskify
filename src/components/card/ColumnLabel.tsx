import styles from './ColumnLabel.module.css';
import Dot from '../svg/Dot';

interface ColumnLabelProps {
  name: string;
  className?: string;
}

export default function ColumnLabel({ name, className }: ColumnLabelProps) {
  return (
    <div className={`${styles.columnLabel} ${className}`}>
      <div>
        <Dot width="6" height="6" />
      </div>
      <span>{name}</span>
    </div>
  );
}
