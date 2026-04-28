import { useMemo } from 'react';
import { Flame, Hourglass, FileCheck2, FlaskConical } from 'lucide-react';
import StatCard from '../components/StatCard';
import CatalystRow from '../components/CatalystRow';
import HBarChart from '../components/HBarChart';
import { daysUntil } from '../utils/format';

const RECENT_WINDOW = 30; // "최근 결과" 기준: 지난 30일
const UPCOMING_WINDOW = 60; // "임박 카탈리스트" 기준: 60일 이내

export default function Dashboard({ data }) {
  const { companies, catalysts } = data;

  const companyByTicker = useMemo(() => {
    const m = new Map();
    for (const c of companies) m.set(c.ticker, c);
    return m;
  }, [companies]);

  const dated = useMemo(() => {
    return catalysts
      .map((c) => ({ ...c, _days: daysUntil(c.date) }))
      .filter((c) => c._days !== null);
  }, [catalysts]);

  const upcoming = useMemo(
    () => dated.filter((c) => c._days >= 0).sort((a, b) => a._days - b._days),
    [dated]
  );
  const recent = useMemo(
    () =>
      dated
        .filter((c) => c._days < 0 && c._days >= -RECENT_WINDOW)
        // 가장 최근(0에 가까운) → 더 오래된 순
        .sort((a, b) => b._days - a._days),
    [dated]
  );

  const within30 = upcoming.filter((c) => c._days <= 30).length;
  const within90 = upcoming.filter((c) => c._days <= 90).length;
  const pdufaCount = upcoming.filter((c) => c.type === 'PDUFA').length;
  const readoutCount = upcoming.filter((c) => c.type === 'Clinical Readout').length;

  const within60 = upcoming.filter((c) => c._days <= UPCOMING_WINDOW);

  // 60일 이내 임박 카탈리스트의 종목들 (중복 ticker 제거, company 매칭 안되는 것은 skip)
  const within60Companies = useMemo(() => {
    const seen = new Set();
    const result = [];
    for (const c of within60) {
      if (seen.has(c.ticker)) continue;
      seen.add(c.ticker);
      const company = companyByTicker.get(c.ticker);
      if (company) result.push(company);
    }
    return result;
  }, [within60, companyByTicker]);

  // Modality 분포 — 60일 이내 임박 카탈리스트 종목만
  const modalityDist = useMemo(() => {
    const counts = new Map();
    for (const c of within60Companies) {
      const k = c.modality || 'Other';
      counts.set(k, (counts.get(k) || 0) + 1);
    }
    return [...counts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  }, [within60Companies]);

  // 치료 영역 분포 — 60일 이내 임박 카탈리스트 종목만 (areas 배열, 종목당 여러 영역 +1)
  const areaDist = useMemo(() => {
    const counts = new Map();
    for (const c of within60Companies) {
      for (const a of c.areas || []) {
        counts.set(a, (counts.get(a) || 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  }, [within60Companies]);

  return (
    <div className="space-y-8">
      {/* 통계 카드 4개 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          tone="rose"
          icon={Flame}
          label="30일 이내 임박"
          value={within30}
          sub="catalysts ≤ D-30"
        />
        <StatCard
          tone="orange"
          icon={Hourglass}
          label="90일 이내 단기"
          value={within90}
          sub="catalysts ≤ D-90"
        />
        <StatCard
          tone="violet"
          icon={FileCheck2}
          label="전체 PDUFA"
          value={pdufaCount}
          sub="FDA 결정 대기"
        />
        <StatCard
          tone="emerald"
          icon={FlaskConical}
          label="임상 readout 예정"
          value={readoutCount}
          sub="upcoming"
        />
      </div>

      {/* 임박 카탈리스트 (60일 이내) */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-base font-semibold text-fg">임박한 카탈리스트</h2>
          <span className="text-xs text-fg-muted">60일 이내 · {within60.length}건</span>
        </div>
        <div className="rounded-xl border border-border bg-bg-card overflow-hidden">
          {within60.length === 0 ? (
            <div className="p-6 text-sm text-fg-muted text-center">60일 이내 카탈리스트 없음.</div>
          ) : (
            within60.map((c, i) => (
              <CatalystRow
                key={`${c.ticker}-${c.date}-${i}`}
                catalyst={c}
                company={companyByTicker.get(c.ticker)}
              />
            ))
          )}
        </div>
      </section>

      {/* 최근 결과 (지난 30일) */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-base font-semibold text-fg">최근 결과</h2>
          <span className="text-xs text-fg-muted">지난 30일 · {recent.length}건</span>
        </div>
        <div className="rounded-xl border border-border bg-bg-card overflow-hidden">
          {recent.length === 0 ? (
            <div className="p-6 text-sm text-fg-muted text-center">지난 30일 내 카탈리스트 없음.</div>
          ) : (
            recent.map((c, i) => (
              <CatalystRow
                key={`${c.ticker}-${c.date}-${i}`}
                catalyst={c}
                company={companyByTicker.get(c.ticker)}
              />
            ))
          )}
        </div>
      </section>

      {/* Modality + 영역 분포 — 60일 이내 임박 카탈리스트 종목 한정 */}
      <section className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-sm font-semibold text-fg">Modality 분포</h3>
            <span className="text-xs text-fg-dim">60일 이내 · {within60Companies.length}종목</span>
          </div>
          {modalityDist.length === 0 ? (
            <div className="text-sm text-fg-muted text-center py-6">데이터 없음.</div>
          ) : (
            <HBarChart items={modalityDist} color="#34d399" />
          )}
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-sm font-semibold text-fg">치료 영역 분포</h3>
            <span className="text-xs text-fg-dim">60일 이내 · {within60Companies.length}종목</span>
          </div>
          {areaDist.length === 0 ? (
            <div className="text-sm text-fg-muted text-center py-6">데이터 없음.</div>
          ) : (
            <HBarChart items={areaDist} color="#a78bfa" />
          )}
        </div>
      </section>
    </div>
  );
}
