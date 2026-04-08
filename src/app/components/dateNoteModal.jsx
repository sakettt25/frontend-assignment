import React, { useEffect, useRef } from 'react';
import { formatKey } from '../utils/dateUtils';
import { HOLIDAYS } from '../utils/constants';

/**
 * DateNoteModal: 
 * A modal dialog for viewing and editing notes attached to a specific date.
 * Opens when the user double-clicks a day cell.
 */
export default function DateNoteModal({
  dateKey,
  notes,
  onAdd,
  onUpdate,
  onToggleImportant,
  onToggleDone,
  onDelete,
  onClose,
}) {
  const firstInputRef = useRef(null);

//   Focus on the input
  useEffect(() => {
    const el = firstInputRef.current;
    if (el) el.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const holiday  = HOLIDAYS[dateKey];
  const formattedDate = formatKey(dateKey);


  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Notes for ${formattedDate}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        {/* Header */}
        <div className="modal__header">
          <div>
            <div className="modal__title">{formattedDate}</div>
            {holiday && (
              <div className="modal__subtitle">🗓 {holiday}</div>
            )}
            {!holiday && (
              <div className="modal__subtitle">Note down important tasks for the day!</div>
            )}
          </div>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal__body">
          {notes.length === 0 && (
            <p className="modal__empty">No notes yet. Add one below!</p>
          )}

          {notes.map((note, idx) => (
            <div className="modal__note-row" key={note.id}>
              {/* Editable text */}
              <input
                ref={idx === 0 ? firstInputRef : null}
                className={`modal__note-input${note.done ? ' is-done' : ''}`}
                type="text"
                placeholder="Write a note…"
                value={note.text}
                onChange={(e) => onUpdate(dateKey, note.id, e.target.value)}
                aria-label={`Note ${idx + 1}`}
              />

              {/* Important toggle */}
              <button
                className={`modal__action-btn${note.important ? ' is-important' : ''}`}
                onClick={() => onToggleImportant(dateKey, note.id)}
                title={note.important ? 'Remove important' : 'Mark important'}
              >
                ★
              </button>

              {/* Done toggle */}
              <button
                className={`modal__action-btn${note.done ? ' is-done' : ''}`}
                onClick={() => onToggleDone(dateKey, note.id)}
                title={note.done ? 'Mark undone' : 'Mark done'}
              >
                ✓
              </button>

              {/* Delete */}
              <button
                className="modal__action-btn del"
                onClick={() => onDelete(dateKey, note.id)}
                title="Delete note"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add new note */}
          <button
            className="modal__add-btn"
            onClick={() => onAdd(dateKey)}
            autoFocus={notes.length === 0}
          >
            + Add note for this day
          </button>
        </div>
      </div>
    </div>
  );
}