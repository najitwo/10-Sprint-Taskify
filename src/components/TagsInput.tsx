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

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      const { value } = e.currentTarget;
      e.currentTarget.value = '';

      if (tags.includes(value) || value.trim() === '') return;
      setTags([...tags, value]);
      setValue(name, [...tags, value]);
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
          onKeyDown={handleKeyUp}
          placeholder="입력 후 Enter"
        />
      </div>
    </div>
  );
}
