import { useRef, useState, KeyboardEvent, useEffect } from 'react';
import Image from 'next/image';
import { Column } from '@/types/dashboardView';
import styles from './StateDropdown.module.css';
import CheckIcon from '/public/icons/done.svg';
import ColumnLabel from '@/components/card/ColumnLabel';

interface StateDropdownProps {
  options: Column[];
  name: 'columnId';
  setValue: (name: 'columnId', value: number) => void;
  defaultColumn: Column;
  className?: string;
}

export default function StateDropdown({
  options,
  name,
  setValue,
  defaultColumn,
  className,
}: StateDropdownProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<Column | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const handleSelect = (option: Column) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
    setValue(name, option.id);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isDropdownVisible && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsDropdownVisible(true);
      return;
    }
    if (!isDropdownVisible) return;

    const lastIndex = options.length - 1;

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
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex]);
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
    if (defaultColumn) {
      setSelectedOption(defaultColumn);
    }
  }, [defaultColumn]);

  const DropdownItem = ({
    option,
    index,
  }: {
    option: Column;
    index: number;
  }) => {
    const isSelected = selectedOption?.id === option.id;
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
        <ColumnLabel name={option.title} className={styles.columnLabel} />
      </li>
    );
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <label className={styles.label}>상태</label>
      <div className={styles.inputWrapper}>
        <input
          name={name}
          type="text"
          className={styles.input}
          onChange={() => {
            setIsDropdownVisible(true);
          }}
          onFocus={() => setIsDropdownVisible(true)}
          autoComplete="off"
          readOnly
        />
        {selectedOption && (
          <ColumnLabel
            name={selectedOption.title}
            className={`${styles.columnLabel} ${styles.selectedLabel}`}
          />
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
          {options.map((option, index) => (
            <DropdownItem key={option.id} option={option} index={index} />
          ))}
        </ul>
      )}
    </div>
  );
}
