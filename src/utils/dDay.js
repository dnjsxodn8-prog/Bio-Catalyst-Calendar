// D-day, phase/type CSS class, and short label helpers used across the UI.
import { daysUntil, parseDateUTC } from './format';

export { daysUntil };

export function dDelta(input) {
  return daysUntil(input);
}

export function fmtD(d) {
  if (d === 0) return 'D-DAY';
  if (d > 0) return 'D-' + d;
  return 'D+' + Math.abs(d);
}

export function dClass(d) {
  if (d == null) return '';
  if (d < 0) return 'past';
  if (d <= 2) return 'imminent';
  if (d <= 14) return 'urgent';
  return '';
}

const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function fmtDate(input) {
  const t = parseDateUTC(input);
  if (t === null) return '';
  const d = new Date(t);
  return `${MONTH[d.getUTCMonth()]} ${String(d.getUTCDate()).padStart(2, '0')}`;
}

export function fmtWeekday(input) {
  const t = parseDateUTC(input);
  if (t === null) return '';
  return WEEKDAY[new Date(t).getUTCDay()];
}

export function fmtMcap(v) {
  if (typeof v !== 'number' || !Number.isFinite(v)) return '—';
  if (v >= 1000) {
    const b = v / 1000;
    return b >= 100 ? `$${Math.round(b)}B` : `$${b.toFixed(1)}B`;
  }
  return `$${Math.round(v)}M`;
}

export function phaseClass(p) {
  if (!p) return '';
  if (p === 'Approved') return 'phase-app';
  if (p.includes('Phase 3')) return 'phase-3';
  if (p.includes('Phase 2')) return 'phase-2';
  return 'phase-1';
}

export function typeClass(t) {
  return 't-' + (t || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
}

