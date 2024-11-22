import { ChangeEvent } from 'react';
import styles from './SearchBar.module.css';
import Image from 'next/image';

interface SearchBarProps {
  title: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ title, onChange }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <Image
        src={'/icons/search.svg'}
        alt="검색 아이콘"
        width={24}
        height={24}
      />
      <input
        type="text"
        value={title}
        onChange={onChange}
        placeholder="검색"
        className={styles.input}
      />
    </div>
  );
}
