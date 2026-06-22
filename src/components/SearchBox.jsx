// spec 012 — 자동완성 검색 박스 (인증/공개 공용)
// 타이핑 시 종목 후보 드롭다운(점수·D-day 포함). 클릭/Enter → onPick(ticker).
import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Lock } from 'lucide-react';
import { fmtD, dClass } from '../utils/dDay';

export default function SearchBox({
  value,
  onChange,
  onPick,
  index,
  placeholder = 'ticker · 회사 · 약물 · 적응증 검색…',
  widthClass = 'w-[200px] md:w-[300px] lg:w-[380px]',
  hideScore = false, // 공개 모드: screener 점수 미노출 + lock 표시
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    if (!index || !value || !value.trim()) return [];
    return index.search(value, 8);
  }, [index, value]);

  // ⌘K / Ctrl+K 포커스
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // 바깥 클릭 닫기
  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  // 결과가 줄면 하이라이트 인덱스를 범위 내로 보정(렌더 중 파생값)
  const hiClamped = results.length ? Math.min(hi, results.length - 1) : 0;

  const showList = open && results.length > 0;

  const pick = (r) => {
    if (!r) return;
    onPick?.(r.ticker);
    setOpen(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (e) => {
    if (!showList) {
      if (e.key === 'ArrowDown' && results.length) setOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHi(Math.min(hiClamped + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHi(Math.max(hiClamped - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pick(results[hiClamped]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className={`relative ${widthClass}`}>
      <div className="flex items-center gap-2.5 h-[38px] px-3 bg-panel-2 border border-line rounded-[10px]">
        <Search className="w-[15px] h-[15px] text-ink-3 flex-shrink-0" strokeWidth={1.6} />
        <input
          ref={inputRef}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={(e) => {
            onChange?.(e.target.value);
            setHi(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={showList}
          aria-controls="searchbox-listbox"
          aria-autocomplete="list"
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-ink text-[13px]"
        />
        <kbd className="mono text-[10px] px-1.5 py-0.5 bg-bg-2 border border-line rounded text-ink-3 tracking-[0.04em] hidden lg:inline-block">
          ⌘K
        </kbd>
      </div>

      {showList && (
        <ul
          id="searchbox-listbox"
          role="listbox"
          className="absolute z-40 mt-1.5 w-full max-h-[360px] overflow-auto bg-panel border border-line rounded-[10px] shadow-xl py-1"
        >
          {results.map((r, i) => (
            <li
              key={r.ticker}
              role="option"
              aria-selected={i === hiClamped}
              onMouseEnter={() => setHi(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(r);
              }}
              className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer ${
                i === hiClamped ? 'bg-panel-2' : ''
              }`}
            >
              <span className="mono text-[12px] font-bold text-ink w-[58px] flex-shrink-0 truncate">
                {r.ticker}
              </span>
              <span className="text-[12.5px] text-ink-2 flex-1 min-w-0 truncate">{r.company}</span>

              {!hideScore &&
                (r.hasScore ? (
                  <span className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: r.grpColor || '#6b7280' }}
                      title={r.grp}
                    />
                    <span className="mono text-[11px] text-ink-3">
                      G{r.g}·E{r.e}
                    </span>
                  </span>
                ) : (
                  <span className="mono text-[10px] text-ink-4 flex-shrink-0">미채점</span>
                ))}

              {r.dDay != null && (
                <span className={`mono text-[10px] flex-shrink-0 dday ${dClass(r.dDay)}`}>
                  {fmtD(r.dDay)}
                </span>
              )}

              {hideScore && (
                <Lock className="w-3 h-3 text-ink-4 flex-shrink-0" strokeWidth={1.8} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
