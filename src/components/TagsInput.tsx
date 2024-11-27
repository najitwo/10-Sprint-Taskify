'use client';

import { useState, KeyboardEvent } from 'react';
import styles from './TagsInput.module.css';
import Tag from './card/Tag';

interface TagsInputProps {
  name: 'tags';
  setValue: (name: 'tags', value: string[]) => void;
}

export default function TagsInput({ name, setValue }: TagsInputProps) {
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      e.stopPropagation();

      e.currentTarget.value = '';

      if (tags.includes(value) || value.trim() === '') return;
      setTags([...tags, value]);
      setValue(name, [...tags, value]);
    }

    if (e.key === 'Backspace' && value === '') {
      e.preventDefault();

      if (tags.length > 0) {
        const nextValue = tags.slice(0, -1);
        setValue(name, nextValue);
        setTags(nextValue);
      }
    }
  };

  const handleClick = (target: string) => {
    const nextValue = tags.filter((tag) => tag !== target);
    setValue(name, nextValue);
    setTags(nextValue);
  };

  return (
    <div className={styles.container}>
      <label>태그</label>
      <div className={styles.inputContainer}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            name={tag}
            className={styles.tag}
            onClick={() => handleClick(tag)}
          />
        ))}
        <input
          className={styles.input}
          onKeyDown={handleKeyDown}
          placeholder="입력 후 Enter"
        />
      </div>
    </div>
  );
}
