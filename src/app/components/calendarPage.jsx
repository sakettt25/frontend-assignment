'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getRingCount } from '../utils/constants';
import '../globals.css';
import { useCalendarState } from '../hooks/useCalendarState';
import CalendarHero from './calendarHero';
import NotesPanel from './notesPanel';
import CalendarGrid from './calendarGrid';
import DateNoteModal from './dateNoteModal';

const SSR_SAFE_RING_COUNT = 18;


export default function CalendarPage() {
  const { navigation,
        animation, 
        range,     
        monthNotes,
        dateNotes,
        computed,
    } = useCalendarState();


    const { year, month, goNext, goPrev } = navigation;  
    const { isFlipping, flipDir } = animation;
    const { startKey, endKey, selectDay, clearRange } = range;
    const { todayKey, daysInMonth, firstDOW, prevMonthLen } = computed;

    const flipClass = isFlipping ? `flip-out-${flipDir}` : '';
    const cardClass = ['cal-card'].join(' ');
    const wrapperFlipClass = ['cal-flip-wrapper', flipClass].filter(Boolean).join(' ');


    // Open the modal for each date to take notes there or mark important stuffs
    const [modalDateKey, setModalDateKey] = useState(null);
    const openModal  = useCallback((key) => setModalDateKey(key), []);
    const closeModal = useCallback(() => setModalDateKey(null), []);


    const [ringCount, setRingCount] = useState(SSR_SAFE_RING_COUNT);

    useEffect(() => {
    const handle = () => setRingCount(getRingCount());
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
    }, []);

  return (
  <div className="cal-shell">
    <div className="cal-wall">
    <div className="cal-card-wrapper">

      <div className="cal-hanger" aria-hidden="true">
        <span className="cal-hanger__nail" />
        <span className="cal-hanger__string" />
      </div>

      <div className="cal-spiral" aria-hidden="true">
        {Array.from({ length: ringCount }, (_, i) => (
          <div key={i} className="cal-ring" />
        ))}
      </div>

      <div className={wrapperFlipClass}>
        <main className={cardClass} aria-label="Wall calendar">
          <CalendarHero year={year} month={month} onPrev={goPrev} onNext={goNext} />

          <div className="cal-body">

            {/* Side panel to take and mark notes */}
            <NotesPanel
                notes={monthNotes.list}
                onUpdate={monthNotes.updateNote}
                onToggleImportant={monthNotes.toggleImportant}
                onToggleDone={monthNotes.toggleDone}
                onAdd={monthNotes.addNote}
                onDelete={monthNotes.deleteNote}
                startKey={startKey}
                endKey={endKey}
                onClearRange={clearRange}
                onRangeSelect={range.setRange}   
                year={year}                       
                month={month}                     
                daysInMonth={daysInMonth} 
            />

            {/* Main body of the calendar to show the grid of dates and handle their states */}
            <CalendarGrid
                year={year}
                month={month}
                daysInMonth={daysInMonth}
                firstDOW={firstDOW}
                prevMonthLen={prevMonthLen}
                todayKey={todayKey}
                startKey={startKey}
                endKey={endKey}
                dateNoteKeys={dateNotes.dateNoteKeys}
                onDayClick={selectDay}
                onDayDoubleClick={openModal}
            />

          </div>

          {/* ADDITIONAL FEATURE - Adding modal that will open on double click to set notes/events for each day */}

           {modalDateKey && (
            <DateNoteModal
                dateKey={modalDateKey}
                notes={dateNotes.getDateNotes(modalDateKey)}
                onAdd={dateNotes.addDateNote}
                onUpdate={dateNotes.updateDateNote}
                onToggleImportant={dateNotes.toggleDateNoteImportant}
                onToggleDone={dateNotes.toggleDateNoteDone}
                onDelete={dateNotes.deleteDateNote}
                onClose={closeModal}
            />
            )}
        </main>
      </div>

    </div>
    </div>
  </div>
);
}