import React from 'react';

const ITEMS = [
  { key: 'start',   dotClass: 'legend-item__dot--start',   label: 'Start / End' },
  { key: 'range',   dotClass: 'legend-item__dot--range',   label: 'In Range'    },
  { key: 'holiday', dotClass: 'legend-item__dot--holiday', label: 'Holiday'     },
  { key: 'today',   dotClass: 'legend-item__dot--today',   label: 'Today'       },
  { key: 'note',    dotClass: 'legend-item__dot--note',    label: 'Has Note'    },
];

export default function CalendarLegend() {
  return (
    <footer className="cal-legend" aria-label="Calendar legend">
      {ITEMS.map(({ key, dotClass, label }) => (
        <div className="legend-item" key={key}>
          <span className={`legend-item__dot ${dotClass}`} aria-hidden="true" />
          <span>{label}</span>
        </div>
      ))}


        <img
          src="/tuf_footer.png"
          alt="Logo"
          style={{ height: '32px', marginLeft: 'auto' }}
        />
    </footer>
  );
}