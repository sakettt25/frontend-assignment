import React, { useState, useCallback } from 'react';
import RangeInfo   from './rangeInfo';
import RangePicker from './rangePicker';

export default function NotesPanel({
  notes,
  onUpdate,
  onToggleImportant,
  onToggleDone,
  onAdd,
  onDelete,
  startKey,
  endKey,
  onClearRange,
  onRangeSelect,   
  year,            
  month,           
  daysInMonth,     
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const togglePicker = useCallback(() => setPickerOpen((v) => !v), []);
  const closePicker  = useCallback(() => setPickerOpen(false), []);

  return (
    <aside className="notes-panel" aria-label="Monthly notes">

      {/* Heading row with three-dot button */}
      <div className="notes-panel__header">
        <p className="notes-panel__heading">Notes</p>
        <div className="notes-panel__header-actions">
          <button
            className="notes-panel__dots-btn"
            onClick={togglePicker}
            aria-label="Select date range"
            title="Select date range"
          >
            ···
          </button>
          {/* RangePicker popover */}
          {pickerOpen && (
            <RangePicker
              year={year}
              month={month}
              daysInMonth={daysInMonth}
              onSelect={onRangeSelect}
              onClose={closePicker}
            />
          )}
        </div>
      </div>

      <ul className="notes-panel__list" role="list">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onUpdate={onUpdate}
            onToggleImportant={onToggleImportant}
            onToggleDone={onToggleDone}
            onDelete={onDelete}
          />
        ))}
      </ul>

      <button className="notes-panel__add-btn" onClick={onAdd} aria-label="Add note">
        + Add note
      </button>

      <RangeInfo startKey={startKey} endKey={endKey} onClear={onClearRange} />
    </aside>
  );
}

function NoteItem({ note, onUpdate, onToggleImportant, onToggleDone, onDelete }) {
  const itemClasses = [
    'note-item',
    note.important && 'is-important',
    note.done      && 'is-done',
  ].filter(Boolean).join(' ');

  return (
    <li className={itemClasses} role="listitem">
      <span className="note-item__dot" aria-hidden="true" />
      <input
        className="note-item__input"
        type="text"
        placeholder="Add note..."
        value={note.text}
        onChange={(e) => onUpdate(note.id, e.target.value)}
        aria-label="Note text"
      />
      <div className="note-item__actions" role="group" aria-label="Note actions">
        <button
          className={`note-item__action-btn${note.important ? ' is-important' : ''}`}
          onClick={() => onToggleImportant(note.id)}
          title={note.important ? 'Remove important' : 'Mark important'}
        >★</button>
        <button
          className={`note-item__action-btn${note.done ? ' is-done' : ''}`}
          onClick={() => onToggleDone(note.id)}
          title={note.done ? 'Mark undone' : 'Mark done'}
        >✓</button>
        <button
          className="note-item__action-btn del"
          onClick={() => onDelete(note.id)}
          title="Delete note"
        >✕</button>
      </div>
    </li>
  );
}