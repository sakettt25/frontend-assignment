/** Zero-pad a number to 2 digits */
export const pad = (n) => String(n).padStart(2, '0');

/** Build a canonical "YYYY-MM-DD" key */
export const toKey = (year, month, day) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

/** Today's key */
export const todayKey = () => {
  const t = new Date();
  return toKey(t.getFullYear(), t.getMonth(), t.getDate());
};

/** Number of days in a given month (0-indexed) */
export const getDaysInMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();

/**
 * Day-of-week index for the 1st of the month.
 * Returns 0 = Monday … 6 = Sunday (ISO week).
 */
export const getFirstDOW = (year, month) => {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
};

/** Human-readable date from a key, e.g. "Apr 7, 2026" */
export const formatKey = (key) => {
  if (!key) return '';
  const [y, mo, d] = key.split('-');
  const monthNames = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec',
  ];
  return `${monthNames[+mo - 1]} ${+d}, ${y}`;
};

/** Inclusive day count between two keys */
export const daysBetween = (startKey, endKey) => {
  if (!startKey || !endKey) return 0;
  return (
    Math.round(
      (new Date(endKey) - new Date(startKey)) / (1000 * 60 * 60 * 24)
    ) + 1
  );
};

/** True if key a is strictly before key b (lexicographic works for ISO dates) */
export const isBefore = (a, b) => a < b;

/** Clamp a value so startKey ≤ endKey; swap if needed */
export const normaliseRange = (a, b) =>
  a <= b ? { startKey: a, endKey: b } : { startKey: b, endKey: a };