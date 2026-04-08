/* eslint-disable react/prop-types */
import React from 'react';
import { MONTHS, MONTH_IMAGES } from '../utils/constants';


export default function CalendarHero({ year, month, onPrev, onNext }) {
  const imgSrc    = MONTH_IMAGES[month];
  const monthName = MONTHS[month].toUpperCase();

  return (
    <div className="cal-hero" role="img" aria-label={`${MONTHS[month]} ${year}`}>

      <div className="cal-hero__controls" aria-label="Calendar navigation">
        <button className="cal-hero__nav-btn" onClick={onPrev} aria-label="Previous month">
          ‹
        </button>
        <button className="cal-hero__nav-btn" onClick={onNext} aria-label="Next month">
          ›
        </button>
      </div>

      {/* Background photo */}
      <img
        className="cal-hero__img"
        src={imgSrc}
        alt={`${MONTHS[month]} scenery`}
        loading="eager"
      />

      {/* Dark gradient overlay */}
      <div className="cal-hero__overlay" aria-hidden="true" />


      {/* Wave shape */}
      <svg
          className="cal-hero__wave"
          viewBox="0 0 860 140"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
      >
        <defs>
          <linearGradient id="leftTri" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4db2ea" />
            <stop offset="100%" stopColor="#1f8ecf" />
          </linearGradient>
          {/* <linearGradient id="rightTri" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#33a2de" />
            <stop offset="100%" stopColor="#1378b8" />
          </linearGradient> */}
        </defs>

        <polygon points="0,40 130,110 0,140" fill="url(#leftTri)" />
        <polygon points="500,85 860,85 860,140 690,140 615,118" fill="url(#rightTri)" />

        <path
          d="M0 140 L0 96 Q260 56 430 118 Q585 168 860 110 L860 140 Z"
          fill="white"
        />
      </svg>

      {/* Month + year badge (bottom-right) */}
      <div className="cal-hero__badge">
        <div className="cal-hero__year">{year}</div>
        <div className="cal-hero__month">{monthName}</div>
      </div>
    </div>
  );
}