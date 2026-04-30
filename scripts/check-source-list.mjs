// scripts/check-source-list.mjs
// 새로 추가/수정된 소수의 URL만 즉시 검증.
// 사용:
//   node scripts/check-source-list.mjs https://a.com https://b.com
//   echo -e "https://a\nhttps://b" | node scripts/check-source-list.mjs -
//
// 종료 코드:
//   0  모두 alive (200·3xx·403 bot block 포함)
//   1  하나 이상 dead (404/5xx/DNS·timeout)
//
// NCT URL은 ClinicalTrials.gov API v2로 본문 검증.
// 403은 봇 차단 false positive로 alive 처리 (브라우저 정상).

const TIMEOUT_MS = 10000;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

async function fetchOnce(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...opts,
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'user-agent': UA,
        accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
        ...(opts.headers || {}),
      },
    });
  } finally { clearTimeout(t); }
}

async function check(url) {
  const nct = url.match(/clinicaltrials\.gov\/study\/(NCT\d{8})/);
  if (nct) {
    try {
      const r = await fetchOnce(`https://clinicaltrials.gov/api/v2/studies/${nct[1]}`);
      if (r.status === 200) return { url, status: 200, alive: true };
      if (r.status === 404) return { url, status: 404, alive: false, reason: 'NCT not found' };
      return { url, status: r.status, alive: false, reason: `NCT API ${r.status}` };
    } catch (e) {
      return { url, alive: false, reason: `NCT fetch error: ${String(e?.message).slice(0, 80)}` };
    }
  }
  try {
    let r = await fetchOnce(url, { method: 'HEAD' });
    if (r.status === 405 || r.status === 501) r = await fetchOnce(url, { method: 'GET' });
    if (r.status < 400) return { url, status: r.status, alive: true };
    if (r.status === 403) return { url, status: 403, alive: true, reason: 'bot blocked (likely alive)' };
    return { url, status: r.status, alive: false, reason: `HTTP ${r.status}` };
  } catch (e) {
    const msg = String(e?.message || e);
    return { url, alive: false, reason: /aborted|timeout/i.test(msg) ? 'timeout' : `fetch error: ${msg.slice(0, 80)}` };
  }
}

async function main() {
  let urls;
  if (process.argv.length > 2 && process.argv[2] !== '-') {
    urls = process.argv.slice(2).filter((a) => a.startsWith('http'));
  } else {
    const text = await new Promise((r) => { let s = ''; process.stdin.on('data', (c) => s += c); process.stdin.on('end', () => r(s)); });
    urls = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith('http'));
  }
  if (urls.length === 0) { console.error('No URLs given'); process.exit(2); }
  const results = await Promise.all(urls.map(check));
  let dead = 0;
  for (const r of results) {
    const tag = r.alive ? '✓' : '✗';
    const extra = r.reason ? `  // ${r.reason}` : '';
    console.log(`${tag} [${r.status ?? '---'}] ${r.url}${extra}`);
    if (!r.alive) dead++;
  }
  if (dead > 0) {
    console.error(`\n${dead}/${urls.length} URLs are dead.`);
    process.exitCode = 1;
  }
}

main().catch((e) => { console.error(e); process.exitCode = 2; });
