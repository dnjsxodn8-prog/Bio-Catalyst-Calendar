// 본문 텍스트의 단순 마크다운 처리.
// 인라인: **bold**, [text](url), naked URL, NCT 번호 자동 링크.
// 블록: 마크다운 list `- 라벨: 값` (+ 들여쓰기 sub-line) → 카드 / 그리드.

const LINK_CLASS =
  'underline decoration-fg-dim/40 hover:text-accent-blue hover:decoration-accent-blue break-all';

const INLINE_PATTERN =
  /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(\*\*([^*]+)\*\*)|(https?:\/\/[^\s,)]+)|(NCT\d{6,9})/g;

const NCT_BASE = 'https://clinicaltrials.gov/study/';
const NCT_LINK_CLASS =
  'text-accent-blue underline decoration-accent-blue/40 hover:decoration-accent-blue font-mono';

// bold inner 텍스트에서 NCT 번호만 한 번 더 링크화. bold 안에 다른 인라인은 거의 안 나타남.
function renderInlineNCT(text, nextKey) {
  const re = /NCT\d{6,9}/g;
  const out = [];
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <a
        key={nextKey()}
        href={`${NCT_BASE}${m[0]}`}
        target="_blank"
        rel="noreferrer"
        className={NCT_LINK_CLASS}
      >
        {m[0]}
      </a>,
    );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length === 1 ? out[0] : out;
}

export function renderInline(text) {
  if (text == null) return null;
  const s = String(text);
  if (!s) return null;

  const parts = [];
  let last = 0;
  let key = 0;
  let m;
  INLINE_PATTERN.lastIndex = 0;
  while ((m = INLINE_PATTERN.exec(s)) !== null) {
    if (m.index > last) parts.push(s.slice(last, m.index));
    if (m[1]) {
      parts.push(
        <a key={key++} href={m[3]} target="_blank" rel="noreferrer" className={LINK_CLASS}>
          {m[2]}
        </a>,
      );
    } else if (m[4]) {
      parts.push(
        <strong key={key++} className="font-semibold text-fg">
          {renderInlineNCT(m[5], () => key++)}
        </strong>,
      );
    } else if (m[6]) {
      parts.push(
        <a key={key++} href={m[6]} target="_blank" rel="noreferrer" className={LINK_CLASS}>
          {m[6]}
        </a>,
      );
    } else if (m[7]) {
      parts.push(
        <a
          key={key++}
          href={`${NCT_BASE}${m[7]}`}
          target="_blank"
          rel="noreferrer"
          className={NCT_LINK_CLASS}
        >
          {m[7]}
        </a>,
      );
    }
    last = INLINE_PATTERN.lastIndex;
  }
  if (last < s.length) parts.push(s.slice(last));
  return parts;
}

function splitLabelValue(text) {
  const m = text.match(/^(?:\*\*([^*]+)\*\*|([^:]+?))\s*:\s*(.*)$/);
  if (m) {
    const label = (m[1] ?? m[2]).trim();
    const value = m[3].trim();
    if (label && label.length <= 30) return { label, value };
  }
  return { label: null, value: text };
}

// 들여쓰기 sub-line을 흡수하는 list 파서.
function parseList(lines) {
  const items = [];
  let cur = null;
  for (const line of lines) {
    if (/^-\s+/.test(line)) {
      if (cur) items.push(cur);
      const stripped = line.replace(/^-\s+/, '');
      const lv = splitLabelValue(stripped);
      cur = { label: lv.label, value: lv.value, sub: [] };
    } else if (/^\s{2,}\S/.test(line)) {
      if (cur) cur.sub.push(line.trim());
    } else if (cur) {
      cur.sub.push(line.trim());
    }
  }
  if (cur) items.push(cur);
  return items;
}

function isShortPair(it) {
  return (
    it.label != null &&
    it.label.length <= 12 &&
    it.value.length <= 32 &&
    it.sub.length === 0
  );
}

function renderListBlock(items, key) {
  // 임상명·약물명 같은 sub-line을 가진 항목이 있으면 sub-card 모드.
  const hasSubCard = items.some((it) => it.sub.length > 0);
  if (hasSubCard) {
    return (
      <div key={key} className="space-y-2">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-md bg-panel-2 border border-line px-3 py-2"
          >
            <div className="text-[13px] font-semibold text-fg leading-snug flex flex-wrap items-baseline gap-x-2">
              {it.label ? (
                <>
                  <span>{renderInline(it.label)}</span>
                  <span className="text-fg-dim font-normal">·</span>
                  <span className="font-normal text-fg-muted">{renderInline(it.value)}</span>
                </>
              ) : (
                <span>{renderInline(it.value)}</span>
              )}
            </div>
            {it.sub.length ? (
              <div className="text-[12.5px] text-fg-muted leading-snug mt-1 space-y-0.5">
                {it.sub.map((s, j) => (
                  <div key={j} className="break-words">
                    {renderInline(s)}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  // 짧은 라벨:값 묶음은 3-col grid, 긴 row는 1-col으로 분리.
  const short = items.filter(isShortPair);
  const long = items.filter((it) => !isShortPair(it));

  return (
    <div key={key} className="space-y-1.5">
      {short.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-1">
          {short.map((it, i) => (
            <div key={i} className="text-[13px] leading-snug">
              <span className="text-fg-dim">{it.label}: </span>
              <span className="text-fg font-medium">{renderInline(it.value)}</span>
            </div>
          ))}
        </div>
      ) : null}
      {long.map((it, i) => (
        <div key={i} className="text-[13px] leading-snug break-words">
          {it.label ? <span className="text-fg-dim">{it.label}: </span> : null}
          <span className="text-fg">{renderInline(it.value)}</span>
        </div>
      ))}
    </div>
  );
}

// body 섹션 텍스트 전체를 JSX 블록 리스트로 변환.
export function renderBody(text) {
  if (text == null) return null;
  const s = String(text).trim();
  if (!s) return null;

  const blocks = s
    .split(/\n\s*\n/)
    .map((b) => b.split('\n').filter((l) => l !== ''))
    .filter((b) => b.length);

  return blocks.map((lines, bi) => {
    // 한 줄 + 전체 bold → sub-헤더
    if (lines.length === 1 && /^\*\*[^*]+\*\*$/.test(lines[0].trim())) {
      const inner = lines[0].trim().replace(/^\*\*|\*\*$/g, '');
      return (
        <div key={bi} className="text-sm font-semibold text-accent-blue leading-snug">
          {inner}
        </div>
      );
    }
    // list 블록 (top-level `- ` 시작 라인 + 그 뒤 들여쓰기/연속 라인)
    if (/^-\s+/.test(lines[0])) {
      const items = parseList(lines);
      if (items.length) return renderListBlock(items, bi);
    }
    // 일반 단락
    return (
      <p
        key={bi}
        className="text-[13px] leading-snug whitespace-pre-line text-fg break-words"
      >
        {renderInline(lines.join('\n'))}
      </p>
    );
  });
}

// "**...**" 한 줄을 추출 (없으면 null). 약물 정보 헤더 인라인용.
export function extractBoldHeader(text) {
  if (!text) return null;
  const firstLine = String(text).trim().split('\n')[0].trim();
  const m = firstLine.match(/^\*\*([^*]+)\*\*$/);
  return m ? m[1].trim() : null;
}

// 첫 줄이 bold-only면 그 줄 제거. 약물 정보의 Modality 본문에서 헤더 중복 제거.
export function stripBoldHeader(text) {
  if (!text) return text;
  const lines = String(text).split('\n');
  if (lines[0] && /^\*\*[^*]+\*\*$/.test(lines[0].trim())) {
    return lines.slice(1).join('\n').replace(/^\n+/, '');
  }
  return text;
}
