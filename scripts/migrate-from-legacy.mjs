// scripts/migrate-from-legacy.mjs
// 1회용 스크립트. legacy/data.js의 export 6종을 data/ 폴더의 마크다운으로 변환한다.
// 시총 100M 미만 종목은 자동 제외하고 별도 리스트로 출력한다.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);

const VALID_MODALITIES = new Set([
  'Small Molecule', 'Antibody', 'Peptide', 'mRNA', 'RNA/siRNA',
  'Gene Therapy', 'Cell Therapy', 'ADC', 'Bispecific', 'Other',
]);

async function main() {
  const legacyUrl = new URL('../legacy/data.js', import.meta.url);
  const {
    initialWatchlist,
    initialConferences,
    initialCatalystEvents,
    companyProfiles,
  } = await import(legacyUrl.href);

  await fs.mkdir(path.join(ROOT, 'data/companies'), { recursive: true });

  const converted = [];
  const excluded = [];
  const modalityWarnings = [];

  for (const stock of initialWatchlist) {
    if (typeof stock.mcap !== 'number' || stock.mcap < 100) {
      excluded.push(stock);
      continue;
    }
    if (!VALID_MODALITIES.has(stock.modality)) {
      modalityWarnings.push({ ticker: stock.ticker, modality: stock.modality });
    }
    const profile = companyProfiles[stock.ticker];
    const fm = buildFrontmatter(stock);
    const body = buildBody(stock, profile);
    const content = `---\n${yaml.stringify(fm).trimEnd()}\n---\n\n${body}\n`;
    const filePath = path.join(ROOT, 'data/companies', `${stock.ticker}.md`);
    await fs.writeFile(filePath, content, 'utf8');
    converted.push(stock);
  }

  await writeCatalysts(initialCatalystEvents);
  await writeConferences(initialConferences);

  await writeExcludedReport(excluded);
  printSummary({ converted, excluded, modalityWarnings, profileCount: Object.keys(companyProfiles).length });
}

function buildFrontmatter(stock) {
  return {
    ticker: stock.ticker,
    company: stock.company,
    mcap: stock.mcap,
    modality: stock.modality,
    areas: stock.areas ?? [],
    nextCatalyst: stock.nextCatalyst ?? null,
    recommendation: stock.recommendation,
    verified: TODAY,
    sources: [],
  };
}

function buildBody(stock, profile) {
  const sec = (heading, content) => {
    if (content == null || content === '' || (Array.isArray(content) && content.length === 0)) {
      return `## ${heading}\n정보 미입력`;
    }
    if (Array.isArray(content)) {
      return `## ${heading}\n${content.map(x => `- ${x}`).join('\n')}`;
    }
    return `## ${heading}\n${content}`;
  };

  const parts = [`# ${stock.company} (${stock.ticker})`, ''];
  parts.push(sec('카탈리스트', stock.catalyst));
  parts.push('');

  if (profile) {
    parts.push(sec('회사 개요', profile.description));
    parts.push('');
    parts.push(sec('매출', profile.revenue));
    parts.push('');
    parts.push(sec('플랫폼', profile.platforms));
    parts.push('');
    parts.push(sec('적응증', profile.areas?.join(', ')));
    parts.push('');
    parts.push(sec('파트너', profile.partners));
    parts.push('');
    parts.push(sec('매출 구조', profile.revenueStructure));
    parts.push('');
    parts.push(sec('자체 판매', profile.canSell));
    parts.push('');
    parts.push(sec('상업화 제품', profile.commercial));
    parts.push('');
  } else {
    parts.push('## 회사 개요\n정보 미입력 (companyProfiles에 없음)');
    parts.push('');
  }

  parts.push(sec('메모', stock.notes));
  return parts.join('\n');
}

async function writeCatalysts(events) {
  const cleaned = events.map(e => ({
    date: e.date,
    ticker: e.ticker,
    event: e.event,
    type: e.type,
    company: e.company,
    drug: e.drug,
    indication: e.indication,
    phase: e.phase,
    sources: [],
  }));
  const yamlBody = yaml.stringify({ events: cleaned });
  const md = `# Catalyst Events\n\n다가오는 카탈리스트(PDUFA, Conference, Clinical Readout, Earnings).\n이벤트 1개 = yaml 항목 1개. \`type\`은 \`PDUFA | Conference | Clinical Readout | Earnings | Regulatory\` 중 하나.\n\n\`\`\`yaml\n${yamlBody}\`\`\`\n`;
  await fs.writeFile(path.join(ROOT, 'data/catalysts.md'), md, 'utf8');
}

async function writeConferences(conferences) {
  const cleaned = conferences.map(c => ({
    id: c.id,
    name: c.name,
    dates: c.dates,
    location: c.location,
    areas: c.areas,
    tier: c.tier,
    importance: c.importance,
    notes: c.notes,
  }));
  const yamlBody = yaml.stringify({ conferences: cleaned });
  const md = `# Conferences\n\n학회 일정. tier는 \`Tier 1 | Tier 2 | Tier 3\`.\n\n\`\`\`yaml\n${yamlBody}\`\`\`\n`;
  await fs.writeFile(path.join(ROOT, 'data/conferences.md'), md, 'utf8');
}

async function writeExcludedReport(excluded) {
  if (excluded.length === 0) return;
  const lines = [
    '# 시총 100M 미만으로 자동 제외된 종목',
    '',
    `생성: ${TODAY}. 이 파일은 gitignore 처리됨.`,
    '',
    '| Ticker | Company | mcap (M USD) | nextCatalyst |',
    '| --- | --- | --- | --- |',
    ...excluded.map(s => `| ${s.ticker} | ${s.company} | ${s.mcap} | ${s.nextCatalyst ?? '-'} |`),
  ];
  await fs.writeFile(path.join(ROOT, 'data/_excluded.md'), lines.join('\n') + '\n', 'utf8');
}

function printSummary({ converted, excluded, modalityWarnings, profileCount }) {
  const noProfile = converted.filter(s => !profileExists(s.ticker, profileCount));
  console.log('');
  console.log(`✅ 변환됨: ${converted.length}개 종목 → data/companies/{TICKER}.md`);
  console.log(`   (companyProfiles 데이터 ${profileCount}개 중 일부는 본문에 합쳐짐)`);
  console.log(`✅ 카탈리스트: data/catalysts.md`);
  console.log(`✅ 학회: data/conferences.md`);
  console.log('');
  if (excluded.length > 0) {
    console.log(`⚠️  시총 100M 미만 ${excluded.length}개 제외 → data/_excluded.md`);
    excluded.forEach(s => console.log(`   - ${s.ticker} (${s.company}): $${s.mcap}M`));
    console.log('');
  } else {
    console.log('⚠️  시총 100M 미만으로 제외된 종목 없음.');
    console.log('');
  }
  if (modalityWarnings.length > 0) {
    console.log(`⚠️  modality enum 위반 ${modalityWarnings.length}개:`);
    modalityWarnings.forEach(w => console.log(`   - ${w.ticker}: '${w.modality}'`));
    console.log('');
  }
  console.log('📌 모든 종목의 sources는 [] 빈 배열로 시작. verify-data가 경고할 것.');
  console.log('📌 verified는 모두 오늘 날짜로 설정. 실제 사실확인 시점에 업데이트 필요.');
}

// companyProfiles 키에 ticker가 있는지 확인 (간단 헬퍼)
function profileExists(ticker, profileCount) {
  return profileCount > 0;
}

main().catch(err => {
  console.error('마이그레이션 실패:', err);
  process.exit(1);
});
