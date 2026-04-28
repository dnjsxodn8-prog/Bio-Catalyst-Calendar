// scripts/patch-add-trial-drug-sections.mjs
//
// 1회용 패치 스크립트.
// legacy/data.js의 trialProfiles + drugProfiles를 읽어
// data/companies/{TICKER}.md에 누락된 임상/약물 섹션 7종을 삽입한다.
//
// - 헤딩이 이미 있는 섹션은 건드리지 않음 (idempotent)
// - 삽입 위치: ## 메모 직전. ## 메모가 없으면 파일 끝.
// - frontmatter, 기존 본문, 다른 섹션은 보존
//
// spec 001 §"선택 헤딩", spec 003 §6-α 참조.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// CompanyDetail.jsx가 찾는 7개 키
const SECTION_ORDER = [
  '임상 디자인',
  '타겟 질환',
  '기존 치료제',
  '사전 공개 임상',
  'Modality',
  'MOA',
  '논문',
];

async function main() {
  const legacyUrl = new URL('../legacy/data.js', import.meta.url);
  const { trialProfiles, drugProfiles } = await import(legacyUrl.href);

  const tickers = new Set([
    ...Object.keys(trialProfiles),
    ...Object.keys(drugProfiles),
  ]);

  const summary = {
    patched: [],
    skippedAlreadyComplete: [],
    skippedFileMissing: [],
    perTickerSections: {},
  };

  for (const ticker of tickers) {
    const filePath = path.join(ROOT, 'data/companies', `${ticker}.md`);
    let raw;
    try {
      raw = await fs.readFile(filePath, 'utf8');
    } catch {
      summary.skippedFileMissing.push(ticker);
      continue;
    }

    const trial = trialProfiles[ticker];
    const drug = drugProfiles[ticker];

    const sections = buildSections(trial, drug);
    const existing = listExistingHeadings(raw);

    const toAdd = SECTION_ORDER
      .filter(key => sections[key] != null)
      .filter(key => !existing.has(key));

    if (toAdd.length === 0) {
      summary.skippedAlreadyComplete.push(ticker);
      continue;
    }

    const insertion = toAdd
      .map(key => `## ${key}\n${sections[key]}`)
      .join('\n\n');

    const updated = insertBeforeMemo(raw, insertion);
    await fs.writeFile(filePath, updated, 'utf8');

    summary.patched.push(ticker);
    summary.perTickerSections[ticker] = toAdd;
  }

  printSummary(summary);
}

// trialProfiles[t], drugProfiles[t] → { '임상 디자인': string, ... }
function buildSections(trial, drug) {
  const out = {};

  if (trial?.design) out['임상 디자인'] = formatDesign(trial.design);
  if (trial?.disease) out['타겟 질환'] = formatDisease(trial.disease);
  if (trial?.existingTx) out['기존 치료제'] = String(trial.existingTx).trim();
  if (Array.isArray(trial?.priorData) && trial.priorData.length > 0) {
    out['사전 공개 임상'] = formatPriorData(trial.priorData);
  }

  if (drug?.modality) out['Modality'] = formatModality(drug.modality, drug.drugName);
  if (drug?.moa) out['MOA'] = formatMoa(drug.moa);
  if (Array.isArray(drug?.moa?.references) && drug.moa.references.length > 0) {
    out['논문'] = formatReferences(drug.moa.references);
  }

  return out;
}

function formatDesign(d) {
  const lines = [];
  if (d.type) lines.push(`- 디자인: ${d.type}`);
  if (d.arms) lines.push(`- Arms: ${d.arms}`);
  if (d.n) lines.push(`- N: ${d.n}`);
  if (d.phase) lines.push(`- Phase: ${d.phase}`);
  if (d.primary) lines.push(`- Primary endpoint: ${d.primary}`);
  if (d.secondary) lines.push(`- Secondary endpoint: ${d.secondary}`);
  return lines.join('\n');
}

function formatDisease(d) {
  const parts = [];
  if (d.name) parts.push(`**${d.name}**`);
  if (d.description) parts.push(d.description);
  const meta = [];
  if (d.patients) meta.push(`- 환자 수: ${d.patients}`);
  if (d.pathology) meta.push(`- 병리: ${d.pathology}`);
  if (meta.length) parts.push(meta.join('\n'));
  return parts.join('\n\n');
}

function formatPriorData(arr) {
  return arr.map(p => {
    const head = [p.name, p.nct, p.phase].filter(Boolean).join(' · ');
    return `- **${head}**\n  결과: ${p.result ?? ''}`.trim();
  }).join('\n');
}

function formatModality(m, drugName) {
  const lines = [];
  if (drugName) lines.push(`**${drugName}**`);
  const head = m.subtype ? (m.type ? `${m.subtype} (type: ${m.type})` : m.subtype) : m.type;
  if (head) lines.push(head);
  if (m.structure) lines.push('', m.structure);
  return lines.join('\n');
}

function formatMoa(m) {
  const lines = [];
  if (m.target) lines.push(`- 타겟: ${m.target}`);
  if (m.mechanism) lines.push(`- 기전: ${m.mechanism}`);
  if (m.pathophysiology) lines.push(`- 병태생리: ${m.pathophysiology}`);
  return lines.join('\n');
}

function formatReferences(refs) {
  return refs.map(r => {
    const title = r.title ?? '(제목 없음)';
    return r.url ? `- [${title}](${r.url})` : `- ${title}`;
  }).join('\n');
}

// md 본문에서 ## 헤딩들 추출
function listExistingHeadings(raw) {
  const set = new Set();
  const lines = raw.split('\n');
  for (const line of lines) {
    const m = line.match(/^## (.+?)\s*$/);
    if (m) set.add(m[1].trim());
  }
  return set;
}

// `## 메모` 직전에 insertion 삽입. 없으면 파일 끝에 append.
function insertBeforeMemo(raw, insertion) {
  const memoIdx = raw.indexOf('\n## 메모');
  if (memoIdx === -1) {
    const trimmed = raw.replace(/\s+$/, '');
    return `${trimmed}\n\n${insertion}\n`;
  }
  const before = raw.slice(0, memoIdx).replace(/\s+$/, '');
  const after = raw.slice(memoIdx); // includes leading \n
  return `${before}\n\n${insertion}\n${after}`;
}

function printSummary({ patched, skippedAlreadyComplete, skippedFileMissing, perTickerSections }) {
  console.log('');
  console.log(`✅ 패치됨: ${patched.length}개 종목`);
  for (const t of patched) {
    console.log(`   - ${t}: ${perTickerSections[t].join(', ')}`);
  }
  console.log('');
  if (skippedAlreadyComplete.length) {
    console.log(`ℹ️  이미 완전 (스킵): ${skippedAlreadyComplete.length}개`);
    console.log(`   ${skippedAlreadyComplete.join(', ')}`);
    console.log('');
  }
  if (skippedFileMissing.length) {
    console.log(`⚠️  파일 없음 (스킵): ${skippedFileMissing.length}개`);
    console.log(`   ${skippedFileMissing.join(', ')}`);
    console.log('');
  }
  console.log('다음 단계: npm run build-data 후 UI에서 임상/약물 섹션 표시 확인.');
}

main().catch(err => {
  console.error('패치 실패:', err);
  process.exit(1);
});
