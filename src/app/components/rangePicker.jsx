import React, { useState, useEffect, useRef } from 'react';
import { toKey, todayKey } from '../utils/dateUtils';

export default function RangePicker({ year, month, daysInMonth, onSelect, onClose }) {
  const today      = todayKey();
  const todayDate  = new Date();
  const isCurrentMonth = todayDate.getFullYear() === year && todayDate.getMonth() === month;

  // Minimum selectable day — if viewing current month, can't pick past days
  const minDay = isCurrentMonth ? todayDate.getDate() : 1;

  const [startDay, setStartDay] = useState(minDay);
  const [endDay,   setEndDay]   = useState(Math.min(minDay + 1, daysInMonth));

  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleStartChange = (e) => {
    const val = Number(e.target.value);
    setStartDay(val);
    if (endDay <= val) setEndDay(Math.min(val + 1, daysInMonth));
  };

  const handleConfirm = () => {
    onSelect(toKey(year, month, startDay), toKey(year, month, endDay));
    onClose();
  };

  const startOptions = [];
  for (let d = minDay; d < daysInMonth; d++) {
    startOptions.push(d);
  }

  const endOptions = [];
  for (let d = startDay + 1; d <= daysInMonth; d++) {
    endOptions.push(d);
  }

  return (
    <div className="range-picker" ref={ref} role="dialog" aria-label="Select date range">
      <p className="range-picker__title">Select range</p>

      <div className="range-picker__row">
        <label className="range-picker__label">From</label>
        <select
          className="range-picker__select"
          value={startDay}
          onChange={handleStartChange}
        >
          {startOptions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="range-picker__row">
        <label className="range-picker__label">To</label>
        <select
          className="range-picker__select"
          value={endDay}
          onChange={(e) => setEndDay(Number(e.target.value))}
        >
          {endOptions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <button className="range-picker__confirm" onClick={handleConfirm}>
        Apply
      </button>
    </div>
  );
}