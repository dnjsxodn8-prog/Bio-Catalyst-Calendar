// scripts/apply-url-alts.mjs
// url-alts.txt 의 "OLD\t-> NEW" 매핑을 data/**/*.md 전체에 적용.
// 안전장치: NEW가 OLD와 같거나 빈 값이면 skip.
// 사용: node scripts/apply-url-alts.mjs [--dry]

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const ALTS = path.join(DATA, 'url-alts.txt');
const DRY = process.argv.includes('--dry');

async function walkMd(dir) {
  const out = [];
  for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'imports' || ent.name === 'prices' || ent.name.startsWith('.')) continue;
      out.push(...await walkMd(p));
    } else if (ent.name.endsWith('.md') && ent.name !== 'url-check-report.md') {
      out.push(p);
    }
  }
  return out;
}

async function main() {
  const text = await fs.readFile(ALTS, 'utf8');
  const mappings = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^(https?:\/\/\S+)\s+->\s+(https?:\/\/\S+)$/);
    if (m && m[1] !== m[2]) mappings.push({ old: m[1], new: m[2] });
  }
  console.log(`Loaded ${mappings.length} mappings`);

  const files = await walkMd(DATA);
  let totalEdits = 0;
  let editedFiles = 0;
  for (const f of files) {
    let content = await fs.readFile(f, 'utf8');
    let original = content;
    let edits = 0;
    for (const { old, new: nu } of mappings) {
      // exact substring replace
      if (content.includes(old)) {
        content = content.split(old).join(nu);
        edits++;
      }
    }
    if (edits > 0) {
      console.log(`${path.relative(ROOT, f)}: ${edits} edit(s)`);
      totalEdits += edits;
      editedFiles++;
      if (!DRY) await fs.writeFile(f, content, 'utf8');
    }
  }
  console.log(`\nTotal: ${totalEdits} substitutions across ${editedFiles} files${DRY ? ' (dry-run)' : ''}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
