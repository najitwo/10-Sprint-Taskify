'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { formatDateFormat } from '@/utils/dateUtils';
import CalendarIcon from '/public/icons/calendar.svg';
import styles from './DatePicker.module.css';

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
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
  };

  const handleTimeClick = (date: string) => {
    setSelectedTime(date);
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

  return (
    <div className={styles.container}>
      <label className={styles.label}>마감일</label>
      <div className={styles.inputWrapper} ref={datePickerRef}>
        <input
          type="text"
          className={styles.input}
          value={
            selectedDate || selectedTime
              ? `${selectedDate} ${selectedTime}`
              : ''
          }
          placeholder="날짜를 입력해주세요"
          readOnly
          onClick={() => setIsCalendarVisible((prev) => !prev)}
        />
        <CalendarIcon className={styles.icon} />
        {isCalendarVisible && (
          <div className={styles.calendarWrapper}>
            <div className={styles.calendar}>
              <div className={styles.calendarHeader}>
                <button onClick={() => handleMonthChange('prev')}>
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
                <button onClick={() => handleMonthChange('next')}>
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
                  const todayStart = new Date(now.setHours(0, 0, 0, 0));
                  const isToday = date?.getTime() === todayStart.getTime();
                  const isPastDate =
                    (date?.getTime() ?? Infinity) < todayStart.getTime() ||
                    (isToday && now.getHours() >= 23 && now.getMinutes() >= 30);

                  return (
                    <button
                      key={index}
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
                    const timeDate = new Date(
                      selectedDate || now.toISOString().split('T')[0]
                    );
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
