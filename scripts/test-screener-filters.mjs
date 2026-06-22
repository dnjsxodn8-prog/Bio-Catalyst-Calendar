// scripts/test-screener-filters.mjs
// spec 020 — screenerFilters 순수함수 단위테스트. 의존성 없이 Node 내장 러너.
//   실행: node --test scripts/test-screener-filters.mjs
// (npm run check 는 lint+verify-data 만 — 테스트 인프라 부재. 검증 단계에서 수동 실행.)

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  defaultFilters,
  passFilters,
  applyFilters,
  sortPoints,
  countActiveFacets,
  activeChips,
  removeChip,
  serializeFilters,
  parseFilters,
  facetOptions,
  mcBucket,
  NA_MODALITY,
} from '../src/utils/screenerFilters.js';

const mk = (o) => ({
  t: 'AAA',
  c: 'Alpha',
  g: 80,
  e: 70,
  t1: 2,
  m: 1500,
  grp: '위대한 후보',
  rl: '',
  wl: '',
  rt: null,
  inCalendar: true,
  mod: 'Small Molecule',
  area: ['Oncology'],
  runway: 5,
  ...o,
});

test('default passes everything', () => {
  assert.equal(passFilters(mk(), defaultFilters()), true);
});

test('grade chip is OR within facet', () => {
  const f = { ...defaultFilters(), grp: ['관찰 후보', '위대한 후보'] };
  assert.equal(passFilters(mk({ grp: '위대한 후보' }), f), true);
  assert.equal(passFilters(mk({ grp: '무등급' }), f), false);
});

test('G/E/T1 ranges', () => {
  const f = { ...defaultFilters(), gMin: 75, eMax: 72, t1Min: 1 };
  assert.equal(passFilters(mk({ g: 80, e: 70, t1: 2 }), f), true);
  assert.equal(passFilters(mk({ g: 74 }), f), false); // g below min
  assert.equal(passFilters(mk({ e: 90 }), f), false); // e above max
  assert.equal(passFilters(mk({ t1: 0 }), f), false); // t1 below min
});

test('mcap bucket', () => {
  assert.equal(mcBucket(50), 'micro');
  assert.equal(mcBucket(500), 'small');
  assert.equal(mcBucket(5000), 'mid');
  assert.equal(mcBucket(50000), 'large');
  assert.equal(mcBucket(500000), 'mega');
  assert.equal(mcBucket(null), 'na');
  const f = { ...defaultFilters(), mc: 'mid' };
  assert.equal(passFilters(mk({ m: 1500 }), f), true);
  assert.equal(passFilters(mk({ m: 50 }), f), false);
});

test('runway min with NA handling', () => {
  let f = { ...defaultFilters(), runwayMin: 4 };
  assert.equal(passFilters(mk({ runway: 5 }), f), true);
  assert.equal(passFilters(mk({ runway: 3 }), f), false);
  assert.equal(passFilters(mk({ runway: null }), f), true); // NA included by default
  f = { ...f, runwayInclNA: false };
  assert.equal(passFilters(mk({ runway: null }), f), false); // NA excluded
});

test('rerating categories', () => {
  const f = { ...defaultFilters(), rr: ['wl'] };
  assert.equal(passFilters(mk({ wl: 'Primary' }), f), true);
  assert.equal(passFilters(mk({ wl: '' }), f), false);
  const f2 = { ...defaultFilters(), rr: ['early'] };
  assert.equal(passFilters(mk({ rl: 'Deep Value Watch' }), f2), true);
  assert.equal(passFilters(mk({ rl: '' }), f2), false);
});

test('inCalendar only', () => {
  const f = { ...defaultFilters(), inCalOnly: true };
  assert.equal(passFilters(mk({ inCalendar: true }), f), true);
  assert.equal(passFilters(mk({ inCalendar: false }), f), false);
});

test('modality incl 미상 bucket', () => {
  const f = { ...defaultFilters(), mod: ['Antibody', NA_MODALITY] };
  assert.equal(passFilters(mk({ mod: 'Antibody' }), f), true);
  assert.equal(passFilters(mk({ mod: null }), f), true); // null → 미상
  assert.equal(passFilters(mk({ mod: 'Small Molecule' }), f), false);
});

test('areas OR; empty area auto-excluded', () => {
  const f = { ...defaultFilters(), area: ['Oncology', 'Neurology'] };
  assert.equal(passFilters(mk({ area: ['Neurology', 'Rare Disease'] }), f), true);
  assert.equal(passFilters(mk({ area: ['Immunology'] }), f), false);
  assert.equal(passFilters(mk({ area: [] }), f), false); // empty excluded
});

test('inline query matches ticker or company', () => {
  const f = { ...defaultFilters(), q: 'alph' };
  assert.equal(passFilters(mk({ t: 'AAA', c: 'Alpha' }), f), true);
  assert.equal(passFilters(mk({ t: 'BBB', c: 'Beta' }), f), false);
});

test('facets combine with AND', () => {
  const f = { ...defaultFilters(), grp: ['위대한 후보'], area: ['Oncology'], gMin: 75 };
  assert.equal(passFilters(mk({ grp: '위대한 후보', area: ['Oncology'], g: 80 }), f), true);
  assert.equal(passFilters(mk({ grp: '위대한 후보', area: ['Neurology'], g: 80 }), f), false);
});

test('applyFilters returns filtered subset', () => {
  const pts = [mk({ t: 'A', g: 80 }), mk({ t: 'B', g: 50 }), mk({ t: 'C', g: 90 })];
  const out = applyFilters(pts, { ...defaultFilters(), gMin: 75 });
  assert.deepEqual(out.map((d) => d.t), ['A', 'C']);
});

test('sort numeric desc/asc, nulls always last', () => {
  const pts = [mk({ t: 'A', rt: 5 }), mk({ t: 'B', rt: null }), mk({ t: 'C', rt: 9 })];
  assert.deepEqual(sortPoints(pts, 'rt', 'desc').map((d) => d.t), ['C', 'A', 'B']);
  assert.deepEqual(sortPoints(pts, 'rt', 'asc').map((d) => d.t), ['A', 'C', 'B']);
});

test('sort string by locale', () => {
  const pts = [mk({ t: 'BBB' }), mk({ t: 'AAA' }), mk({ t: 'CCC' })];
  assert.deepEqual(sortPoints(pts, 't', 'asc').map((d) => d.t), ['AAA', 'BBB', 'CCC']);
});

test('countActiveFacets', () => {
  assert.equal(countActiveFacets(defaultFilters()), 0);
  const f = { ...defaultFilters(), grp: ['위대한 후보'], gMin: 70, area: ['Oncology'] };
  assert.equal(countActiveFacets(f), 3);
});

test('activeChips + removeChip roundtrip', () => {
  const f = { ...defaultFilters(), grp: ['위대한 후보', '관찰 후보'], gMin: 70, mod: ['Antibody'] };
  const chips = activeChips(f);
  const ids = chips.map((c) => c.id);
  assert.ok(ids.includes('grp:위대한 후보'));
  assert.ok(ids.includes('g'));
  assert.ok(ids.includes('mod:Antibody'));
  const after = removeChip(f, 'grp:위대한 후보');
  assert.deepEqual(after.grp, ['관찰 후보']);
  const after2 = removeChip(f, 'g');
  assert.equal(after2.gMin, 0);
  assert.equal(after2.gMax, 100);
});

test('serialize/parse roundtrip preserves filters', () => {
  const f = {
    ...defaultFilters(),
    grp: ['위대한 후보', '무등급'],
    gMin: 70,
    eMax: 90,
    t1Min: 1,
    mc: 'mid',
    runwayMin: 4,
    runwayInclNA: false,
    rr: ['wl'],
    inCalOnly: true,
    mod: ['Antibody', NA_MODALITY],
    area: ['Oncology'],
    q: 'vrtx',
    sort: { key: 'e', dir: 'asc' },
    view: 'chart',
    chart: { type: '2d', z: 'mlog' },
  };
  const params = serializeFilters(f);
  const back = parseFilters(params);
  assert.deepEqual(back, f);
});

test('serialize omits defaults (compact url)', () => {
  const p = serializeFilters(defaultFilters());
  assert.deepEqual(p, {});
});

test('parse tolerates junk / clamps ranges', () => {
  const f = parseFilters({ gmin: '999', gmax: 'abc', grp: 'great,bogus', mc: 'nope', sort: 'x:y' });
  assert.equal(f.gMin, 100); // clamped to 100
  assert.equal(f.gMax, 100); // junk → default
  assert.deepEqual(f.grp, ['위대한 후보']); // bogus dropped
  assert.equal(f.mc, 'all'); // invalid bucket dropped
  assert.equal(f.sort.key, 'g'); // invalid sort key dropped
});

test('parse supports URLSearchParams .get()', () => {
  const sp = new URLSearchParams('grp=watch&gmin=60&view=chart');
  const f = parseFilters(sp);
  assert.deepEqual(f.grp, ['관찰 후보']);
  assert.equal(f.gMin, 60);
  assert.equal(f.view, 'chart');
});

test('facetOptions counts by frequency + 미상', () => {
  const pts = [
    mk({ mod: 'Small Molecule', area: ['Oncology'] }),
    mk({ mod: 'Small Molecule', area: ['Oncology', 'Rare Disease'] }),
    mk({ mod: 'Antibody', area: ['Rare Disease'] }),
    mk({ mod: null, area: [] }),
  ];
  const { mod, area } = facetOptions(pts);
  assert.deepEqual(mod[0], { value: 'Small Molecule', count: 2 });
  assert.equal(mod[mod.length - 1].value, NA_MODALITY);
  assert.equal(mod[mod.length - 1].count, 1);
  assert.deepEqual(area[0], { value: 'Oncology', count: 2 });
});
