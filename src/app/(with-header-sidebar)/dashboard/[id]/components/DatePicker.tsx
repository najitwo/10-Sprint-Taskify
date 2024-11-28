'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { formatDateFormat, formatDateTimeFormat } from '@/utils/dateUtils';
import CalendarIcon from '/public/icons/calendar.svg';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  name: 'dueDate';
  setValue: (name: 'dueDate', value: string) => void;
  defaultDate?: string;
}

export default function DatePicker({
  name,
  setValue,
  defaultDate,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    (defaultDate && formatDateFormat(defaultDate.split(' ')[0])) || ''
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    (defaultDate && defaultDate.split(' ')[1]) || ''
  );
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [shouldOpenUp, setShouldOpenUp] = useState(false);

  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const getDaysInMonth = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < startOfMonth.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }

    return days;
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + (direction === 'next' ? 1 : -1),
          1
        )
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(formatDateFormat(date));
    setSelectedTime('23:30');
    setValue(name, formatDateTimeFormat(`${formatDateFormat(date)} 23:30`));
  };

  const handleTimeClick = (date: string) => {
    const now = new Date();
    const defaultDate = formatDateFormat(now);
    const newSelectedDate = selectedDate || defaultDate;

    setSelectedDate(newSelectedDate);
    setSelectedTime(date);
    setValue(name, formatDateTimeFormat(`${newSelectedDate} ${date}`));
    setIsCalendarVisible(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsCalendarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const daysInMonth = useMemo(
    () => getDaysInMonth(currentMonth),
    [currentMonth]
  );

  const updateCalendarPosition = () => {
    if (datePickerRef.current) {
      const rect = datePickerRef.current.getBoundingClientRect();
      const availableSpaceBelow = window.innerHeight - rect.bottom;
      const calendarHeight = 300;
      setShouldOpenUp(availableSpaceBelow < calendarHeight);
    }
  };

  const toggleCalendarVisibility = () => {
    updateCalendarPosition();
    setIsCalendarVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isCalendarVisible) {
      window.addEventListener('scroll', updateCalendarPosition, true);
      window.addEventListener('resize', updateCalendarPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateCalendarPosition, true);
      window.removeEventListener('resize', updateCalendarPosition);
    };
  }, [isCalendarVisible]);

  return (
    <div className={styles.container}>
      <label className={styles.label}>마감일</label>
      <div className={styles.inputWrapper} ref={datePickerRef}>
        <input
          name={name}
          type="text"
          className={styles.input}
          value={
            selectedDate || selectedTime
              ? `${selectedDate} ${selectedTime}`
              : ''
          }
          placeholder="날짜를 입력해주세요"
          readOnly
          onClick={toggleCalendarVisibility}
        />
        <CalendarIcon className={styles.icon} />
        {isCalendarVisible && (
          <div
            className={`${styles.calendarWrapper} ${
              shouldOpenUp ? styles.above : ''
            }`}
          >
            <div className={styles.calendar}>
              <div className={styles.calendarHeader}>
                <button type="button" onClick={() => handleMonthChange('prev')}>
                  <Image
                    src="/icons/arrow_left.svg"
                    width={16}
                    height={16}
                    alt="왼쪽"
                    className={styles.image}
                  />
                </button>
                <span>
                  {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                </span>
                <button type="button" onClick={() => handleMonthChange('next')}>
                  <Image
                    src="/icons/arrow_right.svg"
                    width={16}
                    height={16}
                    alt="오른쪽"
                    className={styles.image}
                  />
                </button>
              </div>
              <div className={styles.daysOfWeek}>
                {daysOfWeek.map((day) => (
                  <div key={day} className={styles.day}>
                    {day}
                  </div>
                ))}
              </div>
              <div className={styles.days}>
                {daysInMonth.map((date, index) => {
                  const now = new Date();
                  const todayStart = new Date(now);
                  todayStart.setHours(0, 0, 0, 0);

                  const cutoffTime = new Date(todayStart);
                  cutoffTime.setHours(23, 30, 0, 0);

                  const isToday = date?.getTime() === todayStart.getTime();
                  const isPastDate =
                    (date?.getTime() ?? Infinity) < todayStart.getTime() ||
                    (isToday && now.getTime() > cutoffTime.getTime());

                  return (
                    <button
                      key={index}
                      type="button"
                      className={`${styles.dayButton} ${
                        date &&
                        selectedDate === formatDateFormat(date) &&
                        styles.selected
                      } ${isPastDate && styles.disabled}`}
                      onClick={() => date && handleDateClick(date)}
                      disabled={!date || isPastDate}
                    >
                      {date?.getDate() || ''}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className={styles.timePicker}>
              <h4>시간</h4>
              <ul className={styles.timeSelect}>
                {Array.from({ length: 24 }, (_, hour) =>
                  ['00', '30'].map((minute) => {
                    const now = new Date();
                    const time = `${hour.toString().padStart(2, '0')}:${minute}`;
                    const [hourInt, minuteInt] = time.split(':').map(Number);

                    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
                    const koreanDate = kstNow.toISOString().split('T')[0];

                    const timeDate = new Date(selectedDate || koreanDate);
                    timeDate.setHours(hourInt, minuteInt, 0, 0);
                    const isPastTime = timeDate.getTime() < now.getTime();

                    return (
                      <li
                        key={time}
                        onClick={() => !isPastTime && handleTimeClick(time)}
                        className={`${styles.timeList} ${
                          selectedTime === time ? styles.selected : ''
                        } ${isPastTime && styles.disabled}`}
                        tabIndex={0}
                      >
                        {time}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
