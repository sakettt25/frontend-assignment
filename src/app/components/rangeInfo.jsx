import React from 'react';
import { formatKey, daysBetween } from '../utils/dateUtils';

/**
 * RangeInfo: 
 * Shown inside the NotesPanel when a range is being selected or complete.
 */
export default function RangeInfo({ startKey, endKey, onClear }) {
  if (!startKey) return null;

  const count = daysBetween(startKey, endKey);

  return (
    <div className="range-info" aria-live="polite">
      {!endKey ? (
        <>
          <strong className="range-info__label">Start selected</strong>
          {formatKey(startKey)}
          <br />
          <span style={{ opacity: 0.7, fontSize: '10px' }}>Click an end date</span>
        </>
      ) : (
        <>
          <strong className="range-info__label">Selected range</strong>
          {formatKey(startKey)} → {formatKey(endKey)}
          <br />
          <span className="range-info__count">
            {count} day{count !== 1 ? 's' : ''}
          </span>
          <button className="range-info__clear" onClick={onClear}>
            ✕ Clear selection
          </button>
        </>
      )}
    </div>
  );
}