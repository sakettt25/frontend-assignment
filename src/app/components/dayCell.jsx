import React from 'react';
import { HOLIDAYS } from '../utils/constants';

/**
 * DayCell: 
 * Renders a single cell in the calendar grid.
 */
export default function DayCell({
  dateKey,
  day,
  isOther,
  isToday,
  isWeekend,
  isStart,
  isEnd,
  isInRange,
  hasNote,
  onClick,
  onDoubleClick,
}) {
  const holiday = !isOther ? HOLIDAYS[dateKey] : null;

  const classes = [
    'day-cell',
    isOther             && 'is-other',
    !isOther && isToday && 'is-today',
    !isOther && isWeekend && 'is-weekend',
    isStart             && 'is-start',
    isEnd               && 'is-end',
    isInRange           && 'is-in-range',
    holiday             && 'has-holiday',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (!isOther) onClick(dateKey);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation(); // prevent triggering the single-click twice
    if (!isOther) onDoubleClick(dateKey);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter')  handleClick();
    if (e.key === ' ')      handleDoubleClick(e);
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      role={isOther ? undefined : 'button'}
      tabIndex={isOther ? -1 : 0}
      aria-label={isOther ? undefined : buildAriaLabel(day, holiday, isToday, isStart, isEnd, hasNote)}
      aria-pressed={isStart || isEnd ? true : undefined}
    >
      {/* Day number */}
      <span className="day-cell__num">{day}</span>

      {/* Holiday dot*/}
      {holiday && <span className="day-cell__holiday-dot" aria-hidden="true" />}

      {/* Date-note dot*/}
      {hasNote && !holiday && (
        <span className="day-cell__note-dot" aria-hidden="true" />
      )}

      {/* Holiday tooltip */}
      {holiday && (
        <span className="day-cell__tooltip" role="tooltip">
          {holiday}
        </span>
      )}
    </div>
  );
}

// ── Aria label ,to show the important days and present day etc
function buildAriaLabel(day, holiday, isToday, isStart, isEnd, hasNote) {
  const parts = [String(day)];
  if (isToday)  parts.push('today');
  if (isStart)  parts.push('range start');
  if (isEnd)    parts.push('range end');
  if (holiday)  parts.push(holiday);
  if (hasNote)  parts.push('has note');
  return parts.join(', ');
}