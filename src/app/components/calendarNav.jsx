import React from 'react';

export default function CalendarNav({ year, onPrev, onNext }) {
  return (
    <nav className="cal-nav" aria-label="Calendar navigation">
      <button className="cal-nav__btn" onClick={onPrev} aria-label="Previous month">
        ‹
      </button>

      <img
        src="/tuf_logo.png"
        alt="takeUforward"
        className="cal-nav__logo"
      />

      <button className="cal-nav__btn" onClick={onNext} aria-label="Next month">
        ›
      </button>
    </nav>
  );
}