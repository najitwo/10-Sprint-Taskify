import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './RadioInput.module.css';

const COLOR_VALUES = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

export default function RadioInput({
  register,
}: {
  register: UseFormRegisterReturn;
}) {
  return (
    <div className={styles.container}>
      {COLOR_VALUES.map((color) => (
        <input
          key={color}
          type="radio"
          value={color}
          style={{ backgroundColor: `${color}` }}
          className={styles.radio}
          {...register}
        />
      ))}
    </div>
  );
}
