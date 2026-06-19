// scripts/verify-data.mjs
// data/ 폴더의 모든 파일이 spec 001 스키마를 준수하는지 검증.
// spec 003 §2.2 검증 항목표 그대로 구현. 3단계: error / warning / info.
//
// 사용:
//   node scripts/verify-data.mjs              요약 출력 (warnings 첫 5개만)
//   node scripts/verify-data.mjs --verbose    warnings 전체
//   node scripts/verify-data.mjs --json       JSON 출력 (스킬·CI용)
//
// exit code: errors > 0 이면 1, 아니면 0. warnings는 무시.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import yaml from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const MODALITY_ENUM = new Set([
  'Small Molecule', 'Antibody', 'Peptide', 'mRNA', 'RNA/siRNA',
  'Gene Therapy', 'Cell Therapy', 'ADC', 'Bispecific',
  'Biologic', 'Protein/Enzyme', 'Tool/Platform', 'Diagnostic', 'Other',
]);
const CATALYST_TYPE_ENUM = new Set(['PDUFA', 'Conference', 'Clinical Readout', 'Earnings', 'Regulatory']);
const NEWS_TYPE_ENUM = new Set([
  'Financing',
  'Licensing',
  'Partnership',
  'MnA',
  'Pipeline',
  'Regulatory',
  'Personnel',
  'Other',
]);
const CONFERENCE_TIER_ENUM = new Set(['Tier 1', 'Tier 2', 'Tier 3']);

const COMPANY_REQUIRED_FM = ['ticker', 'company', 'mcap', 'modality', 'areas', 'verified'];
const STANDARD_HEADINGS = ['카탈리스트', '회사 개요', '매출', '플랫폼', '적응증', '파트너', '매출 구조', '자체 판매', '상업화 제품', '메모'];

const STALE_VERIFIED_DAYS = 90;
const PRICE_MAX_DAYS = 30;

class Issues {
  constructor() { this.errors = []; this.warnings = []; this.info = []; }
  err(loc, msg)  { this.errors.push({ loc, msg }); }
  warn(loc, msg) { this.warnings.push({ loc, msg }); }
  inf(loc, msg)  { this.info.push({ loc, msg }); }
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const verbose = args.has('--verbose');
  const jsonOut = args.has('--json');

  const issues = new Issues();
  const summary = { companies: 0, catalysts: 0, conferences: 0, prices: 0, research: 0, news: 0 };

  const companies = await verifyCompanies(issues, summary);
  const catalysts = await verifyCatalysts(issues, summary, companies, /* conferences set later */);
  const conferences = await verifyConferences(issues, summary);
  await verifyPrices(issues, summary, companies);
  await verifyResearch(issues, summary, companies);
  await verifyNews(issues, summary, companies, catalysts);

  // catalysts ↔ conferences 참조 검증 (conferences 로드 후)
  verifyCatalystConferenceRefs(issues, catalysts, conferences);

  if (jsonOut) {
    process.stdout.write(JSON.stringify({ summary, ...issues }, null, 2) + '\n');
  } else {
    printHuman(summary, issues, verbose);
  }
  process.exit(issues.errors.length > 0 ? 1 : 0);
}

// ---------- Companies ----------

async function verifyCompanies(issues, summary) {
  const dir = path.join(ROOT, 'data/companies');
  let files;
  try {
    files = (await fs.readdir(dir)).filter(f => f.endsWith('.md'));
  } catch (e) {
    issues.err('data/companies', `디렉토리 읽기 실패: ${e.message}`);
    return new Set();
  }
  summary.companies = files.length;

  const tickers = new Set();
  const seenTicker = new Map(); // ticker -> first file

  for (const file of files) {
    const loc = `data/companies/${file}`;
    const filenameTicker = file.replace(/\.md$/, '');
    let raw;
    try {
      raw = await fs.readFile(path.join(dir, file), 'utf8');
    } catch (e) { issues.err(loc, `파일 읽기 실패: ${e.message}`); continue; }

    let fm, body;
    try { ({ data: fm, content: body } = matter(raw)); }
    catch (e) { issues.err(loc, `frontmatter 파싱 실패: ${e.message}`); continue; }

    // 필수 필드
    for (const k of COMPANY_REQUIRED_FM) {
      if (fm[k] === undefined || fm[k] === null || fm[k] === '') {
        issues.err(loc, `필수 필드 누락: ${k}`);
      }
    }

    // ticker
    if (fm.ticker) {
      if (typeof fm.ticker !== 'string' || fm.ticker !== fm.ticker.toUpperCase()) {
        issues.err(loc, `ticker는 대문자 문자열이어야 함: ${fm.ticker}`);
      }
      if (fm.ticker !== filenameTicker) {
        issues.err(loc, `ticker(${fm.ticker})가 파일명(${filenameTicker})과 불일치`);
      }
      if (seenTicker.has(fm.ticker)) {
        issues.err(loc, `ticker 중복: ${fm.ticker} (${seenTicker.get(fm.ticker)}에도 있음)`);
      } else {
        seenTicker.set(fm.ticker, file);
      }
      tickers.add(fm.ticker);
    }

    // screener 플래그 (선택, boolean). 스크리너 커버리지용 등재 표시 + mcap 하한 완화 게이트 (spec 011)
    if (fm.screener !== undefined && typeof fm.screener !== 'boolean') {
      issues.err(loc, `screener는 boolean이어야 함: ${fm.screener}`);
    }

    // mcap
    // 기본 하한 $100M (요구사항 4번). 단 screener:true 종목은 하한 완화 → WARNING (spec 011 D3).
    if (fm.mcap !== undefined && fm.mcap !== null) {
      if (!Number.isInteger(fm.mcap)) issues.err(loc, `mcap이 정수가 아님: ${fm.mcap}`);
      else if (fm.mcap < 0) issues.err(loc, `mcap이 음수: ${fm.mcap}`);
      else if (fm.mcap < 100) {
        if (fm.screener === true) issues.warn(loc, `mcap < 100: ${fm.mcap} (스크리너 종목, 하한 완화)`);
        else issues.err(loc, `mcap < 100: ${fm.mcap} (요구사항 4번; 스크리너 종목이면 screener:true 필요)`);
      }
    }

    // modality
    if (fm.modality && !MODALITY_ENUM.has(fm.modality)) {
      issues.err(loc, `modality enum 위반: "${fm.modality}"`);
    }

    // areas
    if (fm.areas !== undefined) {
      if (!Array.isArray(fm.areas) || fm.areas.length === 0) {
        issues.err(loc, `areas는 1개 이상 항목의 배열이어야 함`);
      }
    }

    // verified 날짜
    const verifiedYMD = asYMD(fm.verified);
    if (fm.verified !== undefined && verifiedYMD === false) {
      issues.err(loc, `verified 날짜 형식 위반 (YYYY-MM-DD 필요): ${fm.verified}`);
    } else if (verifiedYMD) {
      const days = daysSince(verifiedYMD);
      if (days > STALE_VERIFIED_DAYS) {
        issues.warn(loc, `verified ${verifiedYMD} (${days}일 경과, > ${STALE_VERIFIED_DAYS}일)`);
      }
    }

    // nextCatalyst (null/undefined OK)
    // YYYY-MM-DD 또는 분기/반기 표기 (YYYY-H1/H2, YYYY-Q1~Q4) 허용. 임상 일정은 분기 단위 공시가 흔함.
    if (fm.nextCatalyst != null && fm.nextCatalyst !== '') {
      if (!isValidNextCatalyst(fm.nextCatalyst)) {
        issues.err(loc, `nextCatalyst 형식 위반 (YYYY-MM-DD | YYYY-H1/H2 | YYYY-Q1~Q4): ${fm.nextCatalyst}`);
      }
    }

    // sources
    if (!Array.isArray(fm.sources) || fm.sources.length === 0) {
      issues.warn(loc, `sources 비어있음`);
    } else {
      for (const [i, src] of fm.sources.entries()) {
        if (typeof src !== 'string' || !/^https?:\/\//.test(src)) {
          issues.err(loc, `sources[${i}] URL 형식 위반: ${src}`);
        }
      }
    }

    // 표준 헤딩 체크 (info)
    const headings = parseHeadings(body);
    const missing = STANDARD_HEADINGS.filter(h => !headings.has(h));
    if (missing.length > 0) {
      issues.inf(loc, `표준 헤딩 누락 ${missing.length}개: ${missing.join(', ')}`);
    }
  }

  return tickers;
}

// ---------- Catalysts ----------

async function verifyCatalysts(issues, summary, companyTickers) {
  const loc = 'data/catalysts.md';
  let raw;
  try { raw = await fs.readFile(path.join(ROOT, loc), 'utf8'); }
  catch (e) { issues.err(loc, `파일 읽기 실패: ${e.message}`); return []; }

  const m = raw.match(/```yaml\r?\n([\s\S]*?)```/);
  if (!m) { issues.err(loc, `yaml 블록 없음`); return []; }

  let parsed;
  try { parsed = yaml.parse(m[1]); }
  catch (e) { issues.err(loc, `yaml 파싱 실패: ${e.message}`); return []; }

  const events = parsed?.events ?? [];
  summary.catalysts = events.length;

  const seen = new Map(); // key: date|ticker|event → first idx
  let emptySourcesCount = 0;

  events.forEach((ev, i) => {
    const eloc = `${loc}[${i}]`;
    for (const k of ['date', 'ticker', 'event', 'type', 'company']) {
      if (ev[k] === undefined || ev[k] === null || ev[k] === '') {
        issues.err(eloc, `필수 필드 누락: ${k}`);
      }
    }
    if (ev.date && asYMD(ev.date) === false) {
      issues.err(eloc, `date 형식 위반: ${ev.date}`);
    }
    if (ev.type && !CATALYST_TYPE_ENUM.has(ev.type)) {
      issues.err(eloc, `type enum 위반: "${ev.type}"`);
    }
    if (ev.ticker && !companyTickers.has(ev.ticker)) {
      issues.err(eloc, `ticker "${ev.ticker}"가 data/companies/에 없음`);
    }
    const dedupKey = `${asYMD(ev.date) || ev.date}|${ev.ticker}|${ev.event}`;
    if (seen.has(dedupKey)) {
      issues.err(eloc, `중복 (date+ticker+event 동일, 첫 등장 [${seen.get(dedupKey)}])`);
    } else {
      seen.set(dedupKey, i);
    }
    if (!Array.isArray(ev.sources) || ev.sources.length === 0) {
      emptySourcesCount += 1;
    } else {
      for (const [j, src] of ev.sources.entries()) {
        if (typeof src !== 'string' || !/^https?:\/\//.test(src)) {
          issues.err(eloc, `sources[${j}] URL 형식 위반: ${src}`);
        }
      }
    }
  });

  if (emptySourcesCount > 0) {
    issues.inf(loc, `${emptySourcesCount}/${events.length} 이벤트가 sources 비어있음`);
  }

  return events;
}

// ---------- Conferences ----------

async function verifyConferences(issues, summary) {
  const loc = 'data/conferences.md';
  let raw;
  try { raw = await fs.readFile(path.join(ROOT, loc), 'utf8'); }
  catch (e) { issues.err(loc, `파일 읽기 실패: ${e.message}`); return new Set(); }

  const m = raw.match(/```yaml\r?\n([\s\S]*?)```/);
  if (!m) { issues.err(loc, `yaml 블록 없음`); return new Set(); }

  let parsed;
  try { parsed = yaml.parse(m[1]); }
  catch (e) { issues.err(loc, `yaml 파싱 실패: ${e.message}`); return new Set(); }

  const conferences = parsed?.conferences ?? [];
  summary.conferences = conferences.length;

  const ids = new Set();
  conferences.forEach((c, i) => {
    const cloc = `${loc}[${i}]`;
    for (const k of ['id', 'name', 'dates', 'tier', 'areas']) {
      if (c[k] === undefined || c[k] === null || c[k] === '') {
        issues.err(cloc, `필수 필드 누락: ${k}`);
      }
    }
    if (c.id) {
      if (ids.has(c.id)) issues.err(cloc, `id 중복: ${c.id}`);
      else ids.add(c.id);
    }
    if (c.tier && !CONFERENCE_TIER_ENUM.has(c.tier)) {
      issues.err(cloc, `tier enum 위반: "${c.tier}"`);
    }
    if (c.dates && !isValidDateRange(c.dates)) {
      issues.err(cloc, `dates 형식 위반 (YYYY-MM-DD 또는 YYYY-MM-DD to YYYY-MM-DD): ${c.dates}`);
    }
    if (c.areas !== undefined && (!Array.isArray(c.areas) || c.areas.length === 0)) {
      issues.err(cloc, `areas는 1개 이상 배열이어야 함`);
    }
  });

  return ids;
}

function verifyCatalystConferenceRefs(issues, events, conferenceIds) {
  events.forEach((ev, i) => {
    if (ev.conferenceId != null && ev.conferenceId !== '' && !conferenceIds.has(ev.conferenceId)) {
      issues.err(`data/catalysts.md[${i}]`, `conferenceId "${ev.conferenceId}"가 conferences.md에 없음`);
    }
  });
}

// ---------- Prices ----------

async function verifyPrices(issues, summary, companyTickers) {
  const dir = path.join(ROOT, 'data/prices');
  let files;
  try { files = (await fs.readdir(dir)).filter(f => f.endsWith('.json')); }
  catch { return; } // 폴더 없거나 비어있으면 OK

  summary.prices = files.length;

  for (const file of files) {
    const loc = `data/prices/${file}`;
    let raw, data;
    try { raw = await fs.readFile(path.join(dir, file), 'utf8'); }
    catch (e) { issues.err(loc, `파일 읽기 실패: ${e.message}`); continue; }
    try { data = JSON.parse(raw); }
    catch (e) { issues.err(loc, `JSON 파싱 실패: ${e.message}`); continue; }

    if (!data.ticker) { issues.err(loc, `ticker 필드 누락`); continue; }
    if (!companyTickers.has(data.ticker)) {
      issues.warn(loc, `ticker "${data.ticker}"가 companies에 없음 (stale cache)`);
    }
    if (Array.isArray(data.data)) {
      if (data.data.length > PRICE_MAX_DAYS) {
        issues.warn(loc, `data 길이 ${data.data.length} > ${PRICE_MAX_DAYS}일 (자동 자르기 대상)`);
      }
      data.data.forEach((pt, i) => {
        if (asYMD(pt?.date) === false) issues.err(loc, `data[${i}].date 형식 위반: ${pt?.date}`);
        if (typeof pt?.close !== 'number') issues.err(loc, `data[${i}].close가 숫자 아님: ${pt?.close}`);
      });
    }
  }
}

// ---------- helpers ----------

// ---------- Research (spec 014 + 015) ----------
const RESEARCH_TIERS = new Set(['free', 'pro']);
const numOrNull = (v) => (Number.isFinite(Number(v)) && v !== '' && v != null ? Number(v) : null);

async function verifyResearch(issues, summary, companyTickers) {
  const dir = path.join(ROOT, 'data/research');
  let files;
  try {
    files = await fs.readdir(dir);
  } catch {
    return; // research 디렉토리 없으면 skip
  }
  const tickerSet = new Set(companyTickers);
  for (const file of files) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue; // '_' 접두(템플릿·DEV) 스킵
    const loc = `data/research/${file}`;
    let fm;
    try {
      fm = matter(await fs.readFile(path.join(dir, file), 'utf8')).data || {};
    } catch (e) {
      issues.err(loc, `frontmatter 파싱 실패: ${e.message}`);
      continue;
    }
    summary.research += 1;
    const ticker = String(fm.ticker || file.replace(/\.md$/, '')).toUpperCase();

    // research 종목은 companies/ 에 존재해야 부착됨 (없으면 렌더 안 됨)
    if (tickerSet.size && !tickerSet.has(ticker)) {
      issues.warn(loc, `companies/ 에 ${ticker} 없음 — research 부착 안 됨`);
    }

    // ── assets (spec 015) ──
    const assets = Array.isArray(fm.assets) ? fm.assets : [];
    assets.forEach((a, i) => {
      if (!a || typeof a !== 'object') return;
      const aloc = `${loc} · asset[${i}]${a.name ? ` ${a.name}` : ''}`;
      if (!a.name) issues.warn(aloc, 'name 없음 — 빌드에서 제외됨');
      if (!a.etiology) issues.inf(aloc, 'etiology 없음 (과학 깊이 권장)');
      if (!a.moa) issues.inf(aloc, 'moa 없음 (작용기전 권장)');
      if (a.tier != null && !RESEARCH_TIERS.has(String(a.tier).toLowerCase())) {
        issues.warn(aloc, `tier 값 이상 '${a.tier}' (free|pro)`);
      }
      verifyMarket(issues, aloc, a.market);
    });

    // platform.tier
    if (fm.platform?.tier != null && !RESEARCH_TIERS.has(String(fm.platform.tier).toLowerCase())) {
      issues.warn(`${loc} · platform`, `tier 값 이상 '${fm.platform.tier}'`);
    }
  }
}

function verifyMarket(issues, loc, m) {
  if (!m || typeof m !== 'object') return;
  const price = numOrNull(m.annual_price_usd);
  const pen = numOrNull(m.penetration);
  const pxq = numOrNull(m.pxq_usd);
  const peak = numOrNull(m.peak_sales_usd);
  const tam = numOrNull(m.tam_usd);
  const bull = numOrNull(m.tam_bull_usd);
  const hasNum = [price, pen, pxq, peak, tam, bull].some((v) => v != null);
  if (!hasNum) return;

  // 위조 방지: 수치가 있으면 출처 or 가정 라벨 필수 (spec 015 §2.1, §6)
  const hasSources = Array.isArray(m.market_sources) && m.market_sources.length > 0;
  const bases = [m.patients_basis, m.price_basis, m.penetration_basis, m.peak_sales_basis]
    .filter(Boolean)
    .map(String);
  const hasBasis = bases.length > 0;
  if (!hasSources && !hasBasis) {
    issues.err(loc, 'market 수치에 출처(market_sources)도 가정 라벨(*_basis)도 없음 — 위조 방지 ERROR');
  }

  // 단조성 sanity (WARNING)
  if (pxq != null && tam != null && pxq > tam * 1.05) {
    issues.warn(loc, `P×Q(${fmtB(pxq)}) > TAM(${fmtB(tam)}) — 현실>천장 모순`);
  }
  if (tam != null && bull != null && bull < tam) {
    issues.warn(loc, `bull TAM(${fmtB(bull)}) < base TAM(${fmtB(tam)}) — 확장이 base보다 작음`);
  }
  if (peak != null && tam != null && peak > tam * 1.2) {
    issues.warn(loc, `peak sales(${fmtB(peak)}) > TAM(${fmtB(tam)}) — peak가 TAM 초과`);
  }
  if (pen != null && (pen < 0 || pen > 1)) {
    issues.warn(loc, `penetration ${pen} 가 0~1 범위 밖`);
  }
  // 약가 모달리티 sanity (INFO)
  if (price != null && (price < 1000 || price > 5000000)) {
    issues.inf(loc, `annual_price_usd ${price} 가 일반 레인지($1k~$5M) 밖 — 재확인 권장`);
  }
}

// ---------- News (spec 016 §2, §6 rules 4-6) ----------

async function verifyNews(issues, summary, companyTickers, catalysts) {
  const loc = 'data/news.md';
  let raw;
  try { raw = await fs.readFile(path.join(ROOT, loc), 'utf8'); }
  catch (e) { issues.err(loc, `파일 읽기 실패: ${e.message}`); return []; }

  const m = raw.match(/```yaml\r?\n([\s\S]*?)```/);
  if (!m) { issues.err(loc, `yaml 블록 없음`); return []; }

  let parsed;
  try { parsed = yaml.parse(m[1]); }
  catch (e) { issues.err(loc, `yaml 파싱 실패: ${e.message}`); return []; }

  const news = parsed?.news ?? [];
  if (!Array.isArray(news)) {
    issues.err(loc, 'news는 배열이어야 함');
    return [];
  }
  summary.news = news.length;

  const catalystResultKeys = new Set(
    catalysts
      .filter((ev) => ev && ev.outcome && ev.outcome !== 'pending')
      .map((ev) => duplicateKey(asYMD(ev.outcome_date), ev.ticker, ev.event))
      .filter(Boolean)
  );

  news.forEach((item, i) => {
    const nloc = `${loc}[${i}]`;
    if (!item || typeof item !== 'object') {
      issues.err(nloc, '뉴스 항목은 객체여야 함');
      return;
    }

    for (const k of ['date', 'ticker', 'type', 'headline']) {
      if (item[k] === undefined || item[k] === null || item[k] === '') {
        issues.err(nloc, `필수 필드 누락: ${k}`);
      }
    }

    const ymd = asYMD(item.date);
    if (item.date && ymd === false) {
      issues.err(nloc, `date 형식 위반: ${item.date}`);
    }

    if (item.type && !NEWS_TYPE_ENUM.has(item.type)) {
      issues.err(nloc, `type enum 위반: "${item.type}"`);
    }

    if (item.ticker && !companyTickers.has(item.ticker)) {
      issues.warn(nloc, `ticker "${item.ticker}"가 data/companies/에 없음`);
    }

    if (!Array.isArray(item.sources) || item.sources.length === 0) {
      issues.err(nloc, 'sources는 1개 이상 필요');
    } else {
      for (const [j, src] of item.sources.entries()) {
        if (typeof src !== 'string' || !/^https?:\/\//.test(src)) {
          issues.err(nloc, `sources[${j}] URL 형식 위반: ${src}`);
        }
      }
    }

    const key = duplicateKey(ymd, item.ticker, item.headline);
    if (key && catalystResultKeys.has(key)) {
      issues.warn(nloc, '동일 ticker+date+headline 이 catalyst 결과와 news.md 양쪽에 있음 (중복 입력 의심)');
    }
  });

  return news;
}

function duplicateKey(date, ticker, headline) {
  if (!date || !ticker || !headline) return null;
  return `${date}|${String(ticker).trim().toUpperCase()}|${String(headline).trim()}`;
}

const fmtB = (n) => (n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${Math.round(n / 1e6)}M` : `$${n}`);

function asYMD(v) {
  if (v == null) return null;
  if (v instanceof Date && !isNaN(v)) return v.toISOString().slice(0, 10);
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
    const d = new Date(v);
    return isNaN(d) ? false : v;
  }
  return false;
}

function daysSince(ymd) {
  const d = new Date(ymd);
  return Math.floor((Date.now() - d.getTime()) / (24 * 60 * 60 * 1000));
}

function isValidNextCatalyst(v) {
  if (v instanceof Date && !isNaN(v)) return true;
  if (typeof v !== 'string') return false;
  if (asYMD(v)) return true;
  return /^\d{4}-(H[12]|Q[1-4])$/.test(v);
}

function isValidDateRange(s) {
  if (typeof s !== 'string') return false;
  const single = /^\d{4}-\d{2}-\d{2}$/;
  const range = /^\d{4}-\d{2}-\d{2}\s+to\s+\d{4}-\d{2}-\d{2}$/;
  return single.test(s) || range.test(s);
}

function parseHeadings(body) {
  const set = new Set();
  for (const line of body.split(/\r?\n/)) {
    const m = line.match(/^## (.+?)\s*$/);
    if (m) set.add(m[1].trim());
  }
  return set;
}

// ---------- output ----------

function printHuman(summary, issues, verbose) {
  console.log(`🔍 verify-data`);
  console.log(`  companies:    ${summary.companies}`);
  console.log(`  catalysts:    ${summary.catalysts}`);
  console.log(`  conferences:  ${summary.conferences}`);
  console.log(`  prices:       ${summary.prices}`);
  console.log(`  research:     ${summary.research}`);
  console.log(`  news:         ${summary.news}`);
  console.log('');

  const e = issues.errors.length, w = issues.warnings.length, i = issues.info.length;

  console.log(`❌ ERRORS (${e})`);
  for (const x of issues.errors) console.log(`  ${x.loc}: ${x.msg}`);
  console.log('');

  console.log(`⚠ WARNINGS (${w})`);
  if (verbose || w <= 5) {
    for (const x of issues.warnings) console.log(`  ${x.loc}: ${x.msg}`);
  } else {
    for (const x of issues.warnings.slice(0, 5)) console.log(`  ${x.loc}: ${x.msg}`);
    console.log(`  ... ${w - 5} more (--verbose 로 전체)`);
  }
  console.log('');

  console.log(`ℹ INFO (${i})`);
  if (verbose || i <= 5) {
    for (const x of issues.info) console.log(`  ${x.loc}: ${x.msg}`);
  } else {
    for (const x of issues.info.slice(0, 5)) console.log(`  ${x.loc}: ${x.msg}`);
    console.log(`  ... ${i - 5} more (--verbose 로 전체)`);
  }
  console.log('');

  console.log(e === 0 ? `✓ PASSED (warnings ${w}, info ${i})` : `✗ FAILED (${e} errors)`);
}

main().catch(err => {
  console.error('verify-data 실패:', err);
  process.exit(2);
});
