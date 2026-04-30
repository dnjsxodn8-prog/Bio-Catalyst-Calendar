// scripts/remove-broken-sources.mjs
// 주어진 깨진 URL 목록을 data/**/*.md 의 frontmatter sources에서 제거.
// 안전: 제거 후 sources가 비어버리면 SKIP하고 경고만.
// 사용: node scripts/remove-broken-sources.mjs broken-urls.txt [--dry]

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const DRY = process.argv.includes('--dry');

async function walkMd(dir) {
  const out = [];
  for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'imports' || ent.name === 'prices' || ent.name.startsWith('.')) continue;
      out.push(...await walkMd(p));
    } else if (ent.name.endsWith('.md') && ent.name !== 'url-check-report.md') out.push(p);
  }
  return out;
}

async function main() {
  const arg = process.argv.find((a) => !a.startsWith('-') && a !== process.argv[0] && a !== process.argv[1]);
  if (!arg) { console.error('usage: remove-broken-sources.mjs <urls-file>'); process.exit(2); }
  const text = await fs.readFile(arg, 'utf8');
  const broken = new Set(text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith('http')));
  console.log(`Loaded ${broken.size} broken URLs`);

  const files = await walkMd(DATA);
  let removedCount = 0;
  let skipFiles = 0;
  for (const f of files) {
    const content = await fs.readFile(f, 'utf8');
    // frontmatter 추출
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) continue;
    const fm = fmMatch[1];
    const lines = fm.split(/\r?\n/);
    const inSources = (idx) => {
      // sources: 블록 안인지 판정 — lines 위로 거슬러 'sources:' 찾고, 사이에 다른 top-level key 없으면 true
      for (let k = idx - 1; k >= 0; k--) {
        if (/^sources:/.test(lines[k])) return true;
        if (/^[a-zA-Z]/.test(lines[k])) return false;
      }
      return false;
    };
    const newLines = [];
    let removed = 0;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      const m = l.match(/^\s+-\s+(https?:\/\/\S+)\s*$/);
      if (m && inSources(i) && broken.has(m[1])) {
        removed++;
        continue;
      }
      newLines.push(l);
    }
    if (removed === 0) continue;
    // sources 배열이 텅 비어버리는지 확인
    const newFm = newLines.join('\n');
    const sourcesBlock = newFm.match(/sources:\s*\n((?:\s+- .*\n?)*)/);
    const remainingSources = sourcesBlock ? sourcesBlock[1].trim() : '';
    if (!remainingSources) {
      console.log(`SKIP ${path.relative(ROOT, f)}: removing ${removed} would empty sources`);
      skipFiles++;
      continue;
    }
    // 원본 줄바꿈 보존
    const eol = content.includes('\r\n') ? '\r\n' : '\n';
    const newFmWithEol = newLines.join(eol);
    const newContent = content.replace(fmMatch[0], `---${eol}${newFmWithEol}${eol}---`);
    console.log(`${path.relative(ROOT, f)}: removed ${removed} broken source(s)`);
    removedCount += removed;
    if (!DRY) await fs.writeFile(f, newContent, 'utf8');
  }
  console.log(`\nTotal removed: ${removedCount}; skipped (would empty sources): ${skipFiles}${DRY ? ' (dry-run)' : ''}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
