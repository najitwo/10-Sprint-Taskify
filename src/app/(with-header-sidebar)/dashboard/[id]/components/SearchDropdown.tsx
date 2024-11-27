'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import Image from 'next/image';
import Avatar from '@/components/Avatar';
import { Member } from '@/types/member';
import styles from './SearchDropdown.module.css';
import CheckIcon from '/public/icons/done.svg';

interface SearchDropdownProps {
  options: Member[];
  name: 'assigneeUserId';
  setValue: (name: 'assigneeUserId', value: number) => void;
  placeholder?: string;
  defaultAssignee?: Member;
}

export default function SearchDropdown({
  options,
  name,
  setValue,
  placeholder = '이름을 입력해 주세요',
  defaultAssignee,
}: SearchDropdownProps) {
  const [query, setQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<Member | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const filteredOptions = options.filter((option) =>
    option.nickname.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (option: Member) => {
    setQuery(option.nickname);
    setSelectedOption(option);
    setIsDropdownVisible(false);
    setValue(name, option.userId);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isDropdownVisible && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsDropdownVisible(true);
      return;
    }
    if (!isDropdownVisible) return;

    const lastIndex = filteredOptions.length - 1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex < lastIndex ? prevIndex + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : lastIndex
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[focusedIndex]);
        }
        break;
      case 'Tab':
        setIsDropdownVisible(false);
        setFocusedIndex(-1);
        break;
      case 'Escape':
        e.preventDefault();
        setIsDropdownVisible(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setIsDropdownVisible(false);
      setFocusedIndex(-1);
      setQuery(selectedOption?.nickname || '');
    }
  };

  useEffect(() => {
    if (focusedIndex !== -1 && dropdownRef.current) {
      const focusedItem = dropdownRef.current.children[
        focusedIndex
      ] as HTMLElement;
      focusedItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  useEffect(() => {
    if (defaultAssignee) {
      setQuery(defaultAssignee.nickname);
      setSelectedOption(defaultAssignee);
    }
  }, [defaultAssignee]);

  const DropdownItem = ({
    option,
    index,
  }: {
    option: Member;
    index: number;
  }) => {
    const isSelected = selectedOption?.userId === option.userId;
    const isFocused = index === focusedIndex;

    return (
      <li
        className={`${styles.dropdownItem} ${isFocused ? styles.focus : ''}`}
        tabIndex={0}
        onClick={() => handleSelect(option)}
        onMouseEnter={() => setFocusedIndex(index)}
        role="option"
        aria-selected={isSelected}
      >
        {isSelected && <CheckIcon className={styles.check} />}
        <Avatar
          name={option.nickname}
          className={styles.avatar}
          profileImageUrl={option.profileImageUrl}
        />
        {option.nickname}
      </li>
    );
  };

  return (
    <div
      className={styles.container}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <label className={styles.label}>담당자</label>
      <div className={styles.inputWrapper}>
        <input
          name={name}
          type="text"
          className={`${styles.input} ${selectedOption?.nickname === query ? styles.withAvatar : ''}`}
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsDropdownVisible(true);
          }}
          onFocus={() => setIsDropdownVisible(true)}
          autoComplete="off"
        />
        {selectedOption?.nickname === query && (
          <div className={styles.avatarContainer}>
            <Avatar
              name={selectedOption.nickname}
              className={styles.avatar}
              profileImageUrl={selectedOption.profileImageUrl}
            />
          </div>
        )}
        <Image
          src="/icons/arrow_down.svg"
          width={26}
          height={26}
          className={styles.dropdownIcon}
          alt="드롭다운"
        />
      </div>
      {isDropdownVisible && (
        <ul className={styles.dropdown} ref={dropdownRef}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <DropdownItem key={option.userId} option={option} index={index} />
            ))
          ) : (
            <li className={styles.noResult}>검색 결과가 없습니다</li>
          )}
        </ul>
      )}
    </div>
  );
}
