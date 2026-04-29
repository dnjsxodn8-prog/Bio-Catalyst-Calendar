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

async function main() {
  const companies = await loadCompanies();
  const catalysts = await loadYamlBlock('data/catalysts.md', 'events');
  const conferences = await loadYamlBlock('data/conferences.md', 'conferences');
  const prices = await loadPrices();

  const output = {
    generated: new Date().toISOString(),
    companies,
    catalysts,
    conferences,
    prices,
  };

  const outPath = path.join(ROOT, 'src/data.generated.json');
  await fs.writeFile(outPath, JSON.stringify(output, null, 2), 'utf8');

  console.log(`✅ companies:   ${companies.length}`);
  console.log(`✅ catalysts:   ${catalysts.length}`);
  console.log(`✅ conferences: ${conferences.length}`);
  console.log(`✅ prices:      ${Object.keys(prices).length}`);
  console.log(`→ ${path.relative(ROOT, outPath)}`);
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
