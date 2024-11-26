import styles from './TagsInput.module.css';

interface TagsInputProps {
  name: 'tags';
  setValue: (name: 'tags', value: string[]) => void;
}

export default function TagsInput({ name, setValue }: TagsInputProps) {
  return (
    <div className={styles.container}>
      <label>태그</label>
      <div className={styles.inputContainer}>
        <input />
      </div>
    </div>
  );
}
