export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const DAYS_SHORT = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const HOLIDAYS = {
  '2026-01-01': "New Year's Day",
  '2026-01-19': 'MLK Day',
  '2026-02-14': "Valentine's Day",
  '2026-02-16': 'Presidents Day',
  '2026-03-17': "St. Patrick's Day",
  '2026-04-03': 'Good Friday',
  '2026-04-05': 'Easter',
  '2026-05-10': "Mother's Day",
  '2026-05-25': 'Memorial Day',
  '2026-06-21': "Father's Day",
  '2026-08-15': 'Independence Day',
  '2026-09-07': 'Labor Day',
  '2026-10-12': 'Columbus Day',
  '2026-10-31': 'Halloween',
  '2026-11-11': 'Veterans Day',
  '2026-11-26': 'Thanksgiving',
  '2026-12-25': 'Christmas',
  '2026-12-31': "New Year's Eve",
};

// One curated Unsplash image per month
export const MONTH_IMAGES = [
  'https://images.unsplash.com/photo-1518873890627-d4b177c06e51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ludGVyJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww', // Jan 
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80', // Feb

  'https://images.unsplash.com/photo-1620065487644-1080510335f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VtbWVyJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww', // Mar 

  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=80', // Apr

  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80', // May

  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Jun

  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', // Jul

  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80', // Aug 

  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80', // Sep

  'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&q=80', // Oct

  'https://images.unsplash.com/photo-1508766505-ff8c5c590939?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXV0dW1uJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww', // Nov

  'https://images.unsplash.com/photo-1481603707406-47fe6021a1c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdpbnRlciUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D', // Dec
];

export function getRingCount() {
  if (typeof window === 'undefined') return 18;
  const w = window.innerWidth;
  if (w >= 1024) return 30;
  if (w >= 640)  return 22;
  return 16;
}