// scripts/build-data.mjs
// data/*.md → src/data.generated.json
// React 앱이 import할 단일 JSON.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import yaml from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SITE_URL = 'https://biotechcatalystcalendar.vercel.app';

async function main() {
  const companies = await loadCompanies();
  const catalysts = await loadYamlBlock('data/catalysts.md', 'events');
  const news = await loadYamlBlock('data/news.md', 'news');
  const conferences = await loadYamlBlock('data/conferences.md', 'conferences');
  const prices = await loadPrices();
  const research = await loadResearch();

  // research(줄글·뉴스·점수) 부착 — 보유 종목만. 미보유는 company.research 미존재(undefined). (spec 014 §2.3)
  let researchAttached = 0;
  for (const c of companies) {
    const r = research[String(c.ticker).toUpperCase()];
    if (r) {
      c.research = r;
      researchAttached += 1;
    }
  }

  const feed = buildFeed(catalysts, news);

  const output = {
    generated: new Date().toISOString(),
    companies,
    catalysts,
    conferences,
    prices,
    feed,
  };

  const outPath = path.join(ROOT, 'src/data.generated.json');
  await fs.writeFile(outPath, JSON.stringify(output, null, 2), 'utf8');

  await writeSitemap();

  console.log(`✅ companies:   ${companies.length}`);
  console.log(`✅ catalysts:   ${catalysts.length}`);
  console.log(`✅ news:        ${news.length}`);
  console.log(`✅ feed:        ${feed.length}`);
  console.log(`✅ conferences: ${conferences.length}`);
  console.log(`✅ prices:      ${Object.keys(prices).length}`);
  console.log(`✅ research:    ${researchAttached} 종목 부착${process.env.RESEARCH_DEV === '1' ? ' (DEV: _DEV_* 포함)' : ''}`);
  console.log(`→ ${path.relative(ROOT, outPath)}`);
  console.log('→ public/sitemap.xml');
}

async function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  // 공개 라우트만 (spec 009 §3). /app/* 는 Disallow 라 sitemap 에 포함 안 함.
  const urls = ['/', '/catalysts', '/companies', '/conferences'];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) =>
        `  <url><loc>${SITE_URL}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod><changefreq>${u === '/catalysts' ? 'daily' : 'weekly'}</changefreq></url>`
    ),
    '</urlset>',
    '',
  ].join('\n');
  await fs.writeFile(path.join(ROOT, 'public/sitemap.xml'), xml, 'utf8');
}

async function loadCompanies() {
  const dir = path.join(ROOT, 'data/companies');
  const files = (await fs.readdir(dir)).filter(f => f.endsWith('.md'));
  const companies = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(dir, file), 'utf8');
    const { data: fm, content: body } = matter(raw);
    companies.push({ ...fm, body: parseBodyHeadings(body) });
  }
  companies.sort((a, b) => (b.mcap ?? 0) - (a.mcap ?? 0));
  return companies;
}

function parseBodyHeadings(body) {
  const sections = {};
  const lines = body.split(/\r?\n/);
  let current = null;
  let buf = [];
  for (const line of lines) {
    const m = line.match(/^## (.+)$/);
    if (m) {
      if (current) sections[current] = buf.join('\n').trim();
      current = m[1].trim();
      buf = [];
    } else if (current) {
      buf.push(line);
    }
  }
  if (current) sections[current] = buf.join('\n').trim();
  return sections;
}

function buildFeed(catalysts, news) {
  const catalystItems = catalysts
    .filter((c) => c && c.outcome && c.outcome !== 'pending')
    .map((c) => ({
      date: normDate(c.outcome_date),
      ticker: str(c.ticker),
      kind: 'catalyst',
      outcome: str(c.outcome),
      headline: str(c.event),
      summary: str(c.result),
      type: str(c.type),
      sources: arrayOfStrings(c.outcome_sources),
    }));

  const newsItems = news
    .filter((n) => n && typeof n === 'object')
    .map((n) => ({
      date: normDate(n.date),
      ticker: str(n.ticker),
      kind: 'news',
      type: str(n.type),
      headline: str(n.headline),
      summary: str(n.summary),
      sources: arrayOfStrings(n.sources),
    }));

  return [...catalystItems, ...newsItems].sort((a, b) =>
    String(b.date || '').localeCompare(String(a.date || ''))
  );
}

function arrayOfStrings(v) {
  return Array.isArray(v) ? v.map(str).filter(Boolean) : [];
}

// ── research 인입 (spec 014 §2.3) ────────────────────────────────────────────
// data/research/*.md('_' 접두 제외)를 로드 → { [TICKER]: research } 맵.
// 누락·파싱오류에 관대(빌드 실패 금지). 미보유 종목은 맵에 미존재(부착 안 됨).
// DEV: RESEARCH_DEV=1 이면 _DEV_*.md 픽스처도 포함(머지 전 _DEV_* 파일 삭제 → 자동 비활성).

// everyticker H2 제목 → camelCase 섹션 키 (spec 014 §2.2 순서)
const RESEARCH_SECTION_KEYS = {
  'at a glance': 'atGlance',
  'company profile': 'companyProfile',
  'growth outlook': 'growthOutlook',
  profitability: 'profitability',
  'competitive moat': 'competitiveMoat',
  'financial health': 'financialHealth',
  valuation: 'valuation',
  'shareholder returns': 'shareholderReturns',
  'bottom line': 'bottomLine',
};

// YAML 비인용 날짜는 gray-matter 가 JS Date 로 파싱 → JSON 직렬화 시 ISO 문자열이 됨.
// UI 표기를 위해 'YYYY-MM-DD' 로 정규화. (Date·ISO 문자열·일반 문자열 모두 관대)
function normDate(v) {
  if (v == null) return null;
  if (v instanceof Date && !isNaN(v)) return v.toISOString().slice(0, 10);
  const s = String(v).trim();
  const m = s.match(/^\d{4}-\d{2}-\d{2}/);
  return m ? m[0] : s;
}

function mapResearchSections(rawHeadings) {
  const out = {};
  for (const [title, text] of Object.entries(rawHeadings)) {
    const key = RESEARCH_SECTION_KEYS[title.trim().toLowerCase()];
    if (key && text && text.trim()) out[key] = text.trim();
  }
  return out;
}

const num = (v) => (Number.isFinite(Number(v)) && v !== '' && v != null ? Number(v) : null);
const str = (v) => (v != null ? String(v).trim() : '');
const TIER = (v) => (String(v).toLowerCase() === 'free' ? 'free' : v ? 'pro' : null);

// asset 시장 블록 정규화 (spec 015 §2). 숫자/문자 관대 변환, 누락 skip.
function normMarket(m) {
  if (!m || typeof m !== 'object') return null;
  const out = {
    patients: str(m.patients) || null,
    patientsBasis: str(m.patients_basis) || null,
    annualPriceUsd: num(m.annual_price_usd),
    priceBasis: str(m.price_basis) || null,
    penetration: num(m.penetration),
    penetrationBasis: str(m.penetration_basis) || null,
    pxqUsd: num(m.pxq_usd),
    peakSalesUsd: num(m.peak_sales_usd),
    peakSalesBasis: str(m.peak_sales_basis) || null,
    tamUsd: num(m.tam_usd),
    tamBullUsd: num(m.tam_bull_usd),
    sources: Array.isArray(m.market_sources) ? m.market_sources.map(str).filter(Boolean) : [],
  };
  return Object.values(out).some((v) => v != null && !(Array.isArray(v) && !v.length)) ? out : null;
}

// asset 1개 정규화 (spec 015 §2). etiology/moa/expansion/market/tier.
function normAsset(a) {
  if (!a || typeof a !== 'object') return null;
  const expansion = (Array.isArray(a.expansion) ? a.expansion : [])
    .filter((e) => e && typeof e === 'object')
    .map((e) => ({
      axis: str(e.axis),
      detail: str(e.detail),
      status: str(e.status) || null,
      tamAddUsd: num(e.tam_add_usd),
      sources: Array.isArray(e.sources) ? e.sources.map(str).filter(Boolean) : [],
    }))
    .filter((e) => e.axis || e.detail);
  return {
    name: str(a.name),
    indication: str(a.indication) || null,
    modality: str(a.modality) || null,
    stage: str(a.stage) || null,
    revenueTtmUsd: num(a.revenue_ttm_usd),
    etiology: str(a.etiology) || null,
    moa: str(a.moa) || null,
    market: normMarket(a.market),
    expansion,
    tier: TIER(a.tier),
  };
}

function normPlatform(p) {
  if (!p || typeof p !== 'object') return null;
  const out = { thesis: str(p.thesis) || null, reusability: str(p.reusability) || null, tier: TIER(p.tier) };
  return out.thesis || out.reusability ? out : null;
}

async function loadResearch() {
  const dir = path.join(ROOT, 'data/research');
  const out = {};
  let files;
  try {
    files = await fs.readdir(dir);
  } catch {
    return out;
  }
  const dev = process.env.RESEARCH_DEV === '1';
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    // '_' 접두는 빌드 무시. DEV 모드에서만 _DEV_* 픽스처 포함(_TEMPLATE 등 기타 '_'는 항상 스킵).
    if (file.startsWith('_')) {
      if (!(dev && file.startsWith('_DEV_'))) continue;
    }
    let raw;
    try {
      raw = await fs.readFile(path.join(dir, file), 'utf8');
    } catch {
      continue;
    }
    let parsed;
    try {
      parsed = matter(raw);
    } catch (e) {
      console.warn(`⚠️ research 파싱 스킵 ${file}: ${e.message}`);
      continue;
    }
    const fm = parsed.data || {};
    const ticker = String(fm.ticker || file.replace(/\.md$/, '')).toUpperCase();
    if (!ticker) continue;
    const news = (Array.isArray(fm.news) ? fm.news : [])
      .filter((n) => n && typeof n === 'object')
      .map((n) => ({
        date: normDate(n.date),
        title: n.title != null ? String(n.title) : '',
        summary: n.summary != null ? String(n.summary) : '',
        url: n.url != null ? String(n.url) : '',
        source: n.source != null ? String(n.source) : '',
      }));
    // spec 015: 자산 과학·시장·확장 + 플랫폼 + tier (누락 관대)
    const assets = (Array.isArray(fm.assets) ? fm.assets : [])
      .map(normAsset)
      .filter((a) => a && a.name);
    out[ticker] = {
      updated: normDate(fm.updated),
      author: fm.author ?? null,
      scores: fm.scores && typeof fm.scores === 'object' ? fm.scores : null,
      peers: Array.isArray(fm.peers) ? fm.peers : [],
      news,
      sources: Array.isArray(fm.sources) ? fm.sources : [],
      sections: mapResearchSections(parseBodyHeadings(parsed.content)),
      assets,
      platform: normPlatform(fm.platform),
      pipelineNote: str(fm.pipeline_note) || null,
    };
  }
  return out;
}

async function loadYamlBlock(relPath, key) {
  const raw = await fs.readFile(path.join(ROOT, relPath), 'utf8');
  const m = raw.match(/```yaml\r?\n([\s\S]*?)```/);
  if (!m) throw new Error(`${relPath}에 yaml 블록 없음`);
  const parsed = yaml.parse(m[1]);
  return parsed[key] ?? [];
}

async function loadPrices() {
  const dir = path.join(ROOT, 'data/prices');
  const out = {};
  let files;
  try { files = await fs.readdir(dir); } catch { return out; }
  for (const file of files.filter(f => f.endsWith('.json'))) {
    const data = JSON.parse(await fs.readFile(path.join(dir, file), 'utf8'));
    if (data.ticker) out[data.ticker] = data;
  }
  return out;
}

main().catch(err => {
  console.error('build-data 실패:', err);
  process.exit(1);
});
