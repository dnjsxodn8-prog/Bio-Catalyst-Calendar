// scripts/recheck-urls.mjs
// 주어진 URL 목록만 재검증 (full scan 없이). 한 줄에 URL 하나씩.
// 사용: node scripts/recheck-urls.mjs urls.txt
//      cat urls.txt | node scripts/recheck-urls.mjs -

import fs from 'node:fs/promises';

const TIMEOUT_MS = 15000;
const CONCURRENCY = 15;
const RETRIES = 1;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

async function fetchOnce(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...opts,
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
        ...(opts.headers || {}),
      },
    });
  } finally { clearTimeout(t); }
}

async function check(url) {
  // NCT
  const nctMatch = url.match(/clinicaltrials\.gov\/study\/(NCT\d{8})/);
  if (nctMatch) {
    try {
      const r = await fetchOnce(`https://clinicaltrials.gov/api/v2/studies/${nctMatch[1]}`);
      return { url, status: r.status, kind: r.status === 200 ? 'ok' : (r.status === 404 ? 'nct_not_found' : `http_${r.status}`) };
    } catch (e) { return { url, kind: 'fetch_error', note: String(e?.message).slice(0, 100) }; }
  }
  let lastErr = null;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      let res = await fetchOnce(url, { method: 'HEAD' });
      if (res.status === 405 || res.status === 403 || res.status === 501) {
        res = await fetchOnce(url, { method: 'GET' });
      }
      const kind = res.status >= 400
        ? (res.status === 404 ? 'not_found' : `http_${res.status}`)
        : 'ok';
      return { url, status: res.status, finalUrl: res.url !== url ? res.url : null, kind };
    } catch (e) {
      lastErr = e;
      if (attempt < RETRIES) await new Promise(r => setTimeout(r, 1500));
    }
  }
  const msg = String(lastErr?.message || lastErr);
  let kind = 'fetch_error';
  if (/aborted|timeout/i.test(msg)) kind = 'timeout';
  return { url, kind, note: msg.slice(0, 120) };
}

async function pool(items, worker, n) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (true) {
      const k = i++;
      if (k >= items.length) return;
      out[k] = await worker(items[k]);
    }
  }));
  return out;
}

async function main() {
  const arg = process.argv[2];
  if (!arg) { console.error('usage: recheck-urls.mjs <file|->'); process.exit(2); }
  const text = arg === '-' ? await new Promise((r) => { let s = ''; process.stdin.on('data', (c) => s += c); process.stdin.on('end', () => r(s)); })
                           : await fs.readFile(arg, 'utf8');
  const urls = [...new Set(text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && l.startsWith('http')))];
  console.error(`Rechecking ${urls.length} URLs...`);
  const results = await pool(urls, check, CONCURRENCY);
  const byKind = {};
  for (const r of results) (byKind[r.kind] = byKind[r.kind] || []).push(r);
  for (const k of Object.keys(byKind).sort()) {
    console.log(`# ${k} (${byKind[k].length})`);
    for (const r of byKind[k]) {
      const s = r.status ? ` [${r.status}]` : '';
      const f = r.finalUrl ? ` → ${r.finalUrl}` : '';
      const n = r.note ? ` // ${r.note}` : '';
      console.log(`${r.url}${s}${f}${n}`);
    }
    console.log('');
  }
}

main().catch((e) => { console.error(e); process.exit(2); });
