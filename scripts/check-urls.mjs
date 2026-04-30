// scripts/check-urls.mjs
// data/ 폴더 전체에서 URL을 추출 → 병렬 HTTP 검증 → 실패만 리포트.
// NCT ID는 clinicaltrials.gov 응답 본문에 실제 study가 있는지까지 확인.
//
// 사용:
//   node scripts/check-urls.mjs              실패 리포트만 stdout
//   node scripts/check-urls.mjs --json       JSON 출력
//   node scripts/check-urls.mjs --report     data/url-check-report.md 작성
//   node scripts/check-urls.mjs --only A.md  특정 파일만 (디버그)

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');

const CONCURRENCY = 20;
const TIMEOUT_MS = 12000;
// 봇 차단 false positive 줄이기: 일반 Chrome UA + Accept 헤더 보강
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const ACCEPT_HEADER = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';

const args = process.argv.slice(2);
const jsonOut = args.includes('--json');
const writeReport = args.includes('--report');
const onlyArg = (() => {
  const i = args.indexOf('--only');
  return i >= 0 ? args[i + 1] : null;
})();

function log(...m) { if (!jsonOut) console.error(...m); }

async function walkMd(dir) {
  const out = [];
  for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'imports' || ent.name === 'prices' || ent.name.startsWith('.')) continue;
      out.push(...await walkMd(p));
    } else if (ent.name.endsWith('.md')) {
      if (ent.name === 'url-check-report.md') continue; // self-exclusion
      if (onlyArg && !p.endsWith(onlyArg)) continue;
      out.push(p);
    }
  }
  return out;
}

// 평문 URL: ) 에서 끊김 (markdown 외)
const URL_RE = /https?:\/\/[^\s)<>"'`]+/g;
const NCT_RE = /\bNCT\d{8}\b/g;

// 마크다운 링크 ](url) — 괄호 깊이 카운팅으로 정확하게 종료 위치 찾기.
// `[txt](https://x.com/foo(24)bar)` 같은 paren-포함 URL도 보존.
function extractMdLinks(line) {
  const out = []; // [{ url, span: [start,end] }]
  for (let i = 0; i < line.length - 1; i++) {
    if (line[i] !== ']' || line[i + 1] !== '(') continue;
    const start = i + 2;
    let depth = 1;
    let j = start;
    while (j < line.length && depth > 0) {
      if (line[j] === '(') depth++;
      else if (line[j] === ')') depth--;
      if (depth > 0) j++;
    }
    if (depth === 0) {
      const url = line.slice(start, j);
      if (/^https?:\/\//.test(url)) out.push({ url, span: [start - 2, j + 1] });
      i = j;
    }
  }
  return out;
}

function extractFromText(text, file) {
  const urls = new Map(); // url -> { url, locs:[{file,line,nct?}] }
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let scratch = line;
    for (const { url, span } of extractMdLinks(line)) {
      const cleaned = url.replace(/[.,;:!?]+$/g, '');
      const e = urls.get(cleaned) ?? { url: cleaned, locs: [] };
      e.locs.push({ file: path.relative(ROOT, file), line: i + 1 });
      urls.set(cleaned, e);
      // 스크래치 마스킹
      scratch = scratch.slice(0, span[0]) + ' '.repeat(span[1] - span[0]) + scratch.slice(span[1]);
    }
    for (const m of scratch.matchAll(URL_RE)) {
      let url = m[0];
      url = url.replace(/[.,;:!?\]\)]+$/g, '');
      const e = urls.get(url) ?? { url, locs: [] };
      e.locs.push({ file: path.relative(ROOT, file), line: i + 1 });
      urls.set(url, e);
    }
    for (const m of line.matchAll(NCT_RE)) {
      const nct = m[0];
      const url = `https://clinicaltrials.gov/study/${nct}`;
      const e = urls.get(url) ?? { url, locs: [], nct };
      e.nct = nct;
      e.locs.push({ file: path.relative(ROOT, file), line: i + 1, ref: nct });
      urls.set(url, e);
    }
  }
  return urls;
}

async function gatherAll() {
  const files = await walkMd(DATA);
  const merged = new Map();
  for (const f of files) {
    const text = await fs.readFile(f, 'utf8');
    const urls = extractFromText(text, f);
    for (const [u, e] of urls) {
      const cur = merged.get(u);
      if (cur) {
        cur.locs.push(...e.locs);
        if (e.nct) cur.nct = e.nct;
      } else {
        merged.set(u, e);
      }
    }
  }
  return merged;
}

async function fetchWithTimeout(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...opts,
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'user-agent': USER_AGENT,
        'accept': ACCEPT_HEADER,
        'accept-language': 'en-US,en;q=0.9',
        ...(opts.headers || {}),
      },
    });
  } finally {
    clearTimeout(t);
  }
}

async function checkOne(entry) {
  const { url, nct } = entry;
  const result = { url, status: null, kind: null, finalUrl: null, note: null };
  try {
    let res;
    try {
      res = await fetchWithTimeout(url, { method: 'HEAD' });
      // HEAD가 405/403이면 GET 재시도
      if (res.status === 405 || res.status === 403 || res.status === 501) {
        res = await fetchWithTimeout(url, { method: 'GET' });
      }
    } catch {
      // HEAD 자체가 실패 (일부 서버는 HEAD 거부) → GET
      res = await fetchWithTimeout(url, { method: 'GET' });
    }
    result.status = res.status;
    result.finalUrl = res.url;
    if (res.status >= 400) {
      result.kind = res.status === 404 ? 'not_found' : `http_${res.status}`;
      return result;
    }
    // NCT 검증: clinicaltrials.gov는 SPA(JS 렌더링)이므로 HTML body로는 검증 불가.
    // API v2 사용 — 존재하면 200+JSON, 없으면 404.
    if (nct) {
      try {
        const apiUrl = `https://clinicaltrials.gov/api/v2/studies/${nct}`;
        const r2 = await fetchWithTimeout(apiUrl, { method: 'GET' });
        if (r2.status === 404) {
          result.kind = 'nct_not_found';
          return result;
        }
        if (r2.status >= 400) {
          result.kind = 'nct_fetch_fail';
          result.status = r2.status;
          return result;
        }
        // 200 OK = NCT exists
      } catch (e) {
        result.kind = 'nct_fetch_fail';
        result.note = String(e?.message || e);
        return result;
      }
    }
    result.kind = 'ok';
    return result;
  } catch (e) {
    const msg = String(e?.message || e);
    if (/aborted|timeout/i.test(msg)) result.kind = 'timeout';
    else if (/ENOTFOUND|getaddrinfo|EAI_AGAIN/i.test(msg)) result.kind = 'dns_fail';
    else if (/ECONN|TLS|certificate|self.signed/i.test(msg)) result.kind = 'conn_fail';
    else result.kind = 'fetch_error';
    result.note = msg.slice(0, 200);
    return result;
  }
}

async function runPool(items, worker, concurrency) {
  const results = new Array(items.length);
  let next = 0;
  let done = 0;
  const total = items.length;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await worker(items[i]);
      done++;
      if (done % 25 === 0 || done === total) log(`  [${done}/${total}]`);
    }
  }));
  return results;
}

function categorize(results) {
  const by = {};
  for (const r of results) {
    (by[r.kind] = by[r.kind] || []).push(r);
  }
  return by;
}

function fmtLocs(locs) {
  // 동일 파일 압축
  const map = new Map();
  for (const l of locs) {
    const k = l.file;
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(l.line);
  }
  return [...map.entries()].map(([f, lines]) => `${f}:${[...new Set(lines)].sort((a,b)=>a-b).join(',')}`).join(' ');
}

function buildReport(entries, results) {
  const byKind = categorize(results);
  const failKinds = ['not_found', 'http_4', 'http_5', 'timeout', 'dns_fail', 'conn_fail', 'fetch_error', 'nct_not_found', 'nct_fetch_fail'];
  const lines = [];
  lines.push(`# URL Check Report`);
  lines.push('');
  lines.push(`Total URLs: ${results.length}`);
  for (const k of Object.keys(byKind).sort()) {
    lines.push(`- ${k}: ${byKind[k].length}`);
  }
  lines.push('');
  for (const k of Object.keys(byKind).sort()) {
    if (k === 'ok') continue;
    lines.push(`## ${k} (${byKind[k].length})`);
    lines.push('');
    for (const r of byKind[k]) {
      const e = entries.find((x) => x.url === r.url);
      const locs = e ? fmtLocs(e.locs) : '';
      const extra = r.status ? ` [${r.status}]` : '';
      const fin = (r.finalUrl && r.finalUrl !== r.url) ? ` → ${r.finalUrl}` : '';
      const note = r.note ? ` // ${r.note}` : '';
      lines.push(`- ${r.url}${extra}${fin}${note}`);
      lines.push(`  ${locs}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

async function main() {
  log('Gathering URLs from data/ …');
  const merged = await gatherAll();
  const entries = [...merged.values()];
  log(`Found ${entries.length} unique URLs/NCT links.`);

  log(`Checking with concurrency=${CONCURRENCY}, timeout=${TIMEOUT_MS}ms …`);
  const results = await runPool(entries, checkOne, CONCURRENCY);

  if (jsonOut) {
    process.stdout.write(JSON.stringify({ entries, results }, null, 2) + '\n');
    return;
  }

  const report = buildReport(entries, results);
  if (writeReport) {
    const out = path.join(DATA, 'url-check-report.md');
    await fs.writeFile(out, report, 'utf8');
    log(`Report written: ${path.relative(ROOT, out)}`);
  }
  process.stdout.write(report + '\n');

  const fails = results.filter((r) => r.kind !== 'ok').length;
  process.exitCode = fails > 0 ? 1 : 0;
}

main().catch((e) => { console.error(e); process.exit(2); });
