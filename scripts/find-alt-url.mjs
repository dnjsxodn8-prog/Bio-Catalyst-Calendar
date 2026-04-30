// scripts/find-alt-url.mjs
// 깨진 URL이 있을 때 같은 도메인의 흔한 대체 경로를 시도해서 OK/3xx/redirect되는 첫 URL 반환.
// 사용: echo "https://ir.example.com/news-releases" | node scripts/find-alt-url.mjs
//      node scripts/find-alt-url.mjs <input-file>

import fs from 'node:fs/promises';

const TIMEOUT_MS = 10000;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const PATH_VARIANTS = {
  // IR/news 패턴: /news-releases 가 깨졌을 때 대체
  '/news-releases': ['/news', '/press-releases', '/investors/news-releases', '/investors/news', '/news-and-events', ''],
  '/news-releases/': ['/news/', '/press-releases/', '/investors/', ''],
  '/press-releases': ['/news-releases', '/news', '/press', ''],
  '/press-releases/': ['/news-releases/', '/news/', ''],
  // Pipeline
  '/pipeline': ['/our-pipeline', '/programs', '/portfolio', '/research', '/research-pipeline', ''],
  '/pipeline/': ['/our-pipeline/', '/programs/', '/portfolio/', ''],
  '/our-pipeline': ['/pipeline', '/programs', ''],
  // Generic root fallback
};

async function head(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    let r = await fetch(url, { method: 'HEAD', signal: ctrl.signal, redirect: 'follow', headers: { 'user-agent': UA, accept: '*/*' } });
    if (r.status === 405 || r.status === 501) {
      r = await fetch(url, { method: 'GET', signal: ctrl.signal, redirect: 'follow', headers: { 'user-agent': UA, accept: '*/*' } });
    }
    // 403도 'OK'로 간주: 도메인은 살아있고 봇만 차단된 경우. 브라우저로는 정상 접속 가능.
    const ok = r.status < 400 || r.status === 403;
    return { ok, status: r.status, finalUrl: r.url };
  } catch (e) {
    return { ok: false, err: String(e?.message).slice(0, 100) };
  } finally { clearTimeout(t); }
}

function parentDomains(host) {
  // ir.alumis.com → [alumis.com, www.alumis.com]
  // investors.regeneron.com → [regeneron.com, www.regeneron.com]
  const out = [];
  const m = host.match(/^(ir|investor|investors|investor-relations)\.(.+)$/);
  if (m) {
    out.push(m[2]);
    out.push(`www.${m[2]}`);
  }
  // www.X.Y → X.Y
  if (host.startsWith('www.')) out.push(host.slice(4));
  return out;
}

function variantsFor(url) {
  const u = new URL(url);
  const path = u.pathname;
  const out = new Set();
  // Same-domain path variants
  for (const [pat, alts] of Object.entries(PATH_VARIANTS)) {
    if (path.endsWith(pat)) {
      const base = path.slice(0, -pat.length);
      for (const alt of alts) {
        const newPath = base + alt;
        out.add(`${u.origin}${newPath || '/'}`);
      }
    }
  }
  out.add(`${u.origin}/`);
  // Parent-domain variants (for dead IR subdomains)
  for (const ph of parentDomains(u.hostname)) {
    out.add(`https://${ph}/`);
    out.add(`https://${ph}/news`);
    out.add(`https://${ph}/news-releases`);
    out.add(`https://${ph}/press-releases`);
    out.add(`https://${ph}/investors`);
    out.add(`https://${ph}/investors/news`);
    out.add(`https://${ph}/investors/news-releases`);
    out.add(`https://${ph}/pipeline`);
  }
  out.delete(url);
  return [...out];
}

async function findAlt(url) {
  const variants = variantsFor(url);
  for (const v of variants) {
    const r = await head(v);
    if (r.ok) return { found: v, status: r.status, finalUrl: r.finalUrl };
  }
  return { found: null };
}

async function main() {
  const arg = process.argv[2];
  let urls;
  if (arg && arg !== '-') {
    const t = await fs.readFile(arg, 'utf8');
    urls = t.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith('http'));
  } else {
    const t = await new Promise((r) => { let s = ''; process.stdin.on('data', (c) => s += c); process.stdin.on('end', () => r(s)); });
    urls = t.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith('http'));
  }
  const results = await Promise.all(urls.map(async (u) => ({ url: u, alt: await findAlt(u) })));
  for (const { url, alt } of results) {
    if (alt.found) {
      console.log(`${url}\t-> ${alt.found}`);
    } else {
      console.log(`${url}\t<no alt found>`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(2); });
