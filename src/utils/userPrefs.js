import { useCallback, useEffect, useState } from 'react';

const RECENT_KEY = 'bcc:recent';
const WATCHLIST_KEY = 'bcc:watchlist';
const RECENT_MAX = 5;

function readJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / privacy mode — silently ignore */
  }
}

export function useRecent() {
  const [recent, setRecent] = useState(() => readJSON(RECENT_KEY, []));
  useEffect(() => writeJSON(RECENT_KEY, recent), [recent]);

  const push = useCallback((ticker) => {
    if (!ticker) return;
    setRecent((prev) => [ticker, ...prev.filter((t) => t !== ticker)].slice(0, RECENT_MAX));
  }, []);

  return [recent, push];
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => readJSON(WATCHLIST_KEY, {}));
  useEffect(() => writeJSON(WATCHLIST_KEY, watchlist), [watchlist]);

  const groups = Object.keys(watchlist);

  const isMember = useCallback(
    (group, ticker) => (watchlist[group] || []).includes(ticker),
    [watchlist]
  );

  const toggle = useCallback((group, ticker) => {
    setWatchlist((prev) => {
      const list = prev[group] || [];
      const next = list.includes(ticker)
        ? list.filter((t) => t !== ticker)
        : [...list, ticker];
      return { ...prev, [group]: next };
    });
  }, []);

  const addGroup = useCallback((name) => {
    const trimmed = (name || '').trim();
    if (!trimmed) return;
    setWatchlist((prev) => (prev[trimmed] ? prev : { ...prev, [trimmed]: [] }));
  }, []);

  const removeGroup = useCallback((group) => {
    setWatchlist((prev) => {
      const next = { ...prev };
      delete next[group];
      return next;
    });
  }, []);

  return { watchlist, groups, isMember, toggle, addGroup, removeGroup };
}
