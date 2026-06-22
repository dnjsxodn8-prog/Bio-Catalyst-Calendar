import { useCallback, useEffect, useState } from 'react';

const RECENT_KEY = 'bcc:recent';
const WATCHLIST_KEY = 'bcc:watchlist';
const SAVED_SEARCH_KEY = 'bcc:savedSearch';
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

// 로컬 저장 데이터(관심 그룹·최근 본 종목) 전체 삭제. 설정/공개 메뉴의 "로컬 데이터 삭제"용.
// 투자 관심사가 담길 수 있어 사용자가 직접 비울 수 있게 한다. (spec 019 §6)
export function clearLocalData() {
  try {
    localStorage.removeItem(RECENT_KEY);
    localStorage.removeItem(WATCHLIST_KEY);
    localStorage.removeItem(SAVED_SEARCH_KEY);
  } catch {
    /* privacy mode — ignore */
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

// spec 020 — 스크리너 저장검색. 항목 = { id, name, params }(params = serializeFilters 결과).
// 필터+정렬+뷰 전체를 한 프리셋으로 저장/복원/삭제.
export function useSavedSearches() {
  const [searches, setSearches] = useState(() => readJSON(SAVED_SEARCH_KEY, []));
  useEffect(() => writeJSON(SAVED_SEARCH_KEY, searches), [searches]);

  const save = useCallback((name, params) => {
    const trimmed = (name || '').trim();
    if (!trimmed) return;
    setSearches((prev) => {
      const id = `${trimmed}::${Date.now()}`;
      const without = prev.filter((s) => s.name !== trimmed); // 같은 이름 덮어쓰기
      return [...without, { id, name: trimmed, params }];
    });
  }, []);

  const remove = useCallback((id) => {
    setSearches((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { searches, save, remove };
}
