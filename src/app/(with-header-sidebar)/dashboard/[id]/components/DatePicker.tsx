'use client';

import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from './DatePicker.module.css';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
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

  const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  return (
    <div className={styles.container}>
      <label className={styles.label}>마감일</label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          value={`${selectedDate} ${selectedTime}`}
          placeholder="날짜를 입력해주세요"
          readOnly
          onClick={() => setIsCalendarVisible((prev) => !prev)}
        />
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
                {daysInMonth.map((date, index) => (
                  <button
                    key={index}
                    className={`${styles.dayButton} ${
                      date &&
                      selectedDate === date.toISOString().split('T')[0] &&
                      styles.selected
                    }`}
                    onClick={() => date && handleDateClick(date)}
                    disabled={!date}
                  >
                    {date?.getDate() || ''}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.timePicker}>
              <select
                className={styles.timeSelect}
                value={selectedTime}
                onChange={handleTimeChange}
              >
                {Array.from({ length: 24 }, (_, hour) =>
                  ['00', '30'].map((minute) => {
                    const time = `${hour.toString().padStart(2, '0')}:${minute}`;
                    return (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
