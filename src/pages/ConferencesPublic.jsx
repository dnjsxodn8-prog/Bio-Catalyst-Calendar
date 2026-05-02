import { useState } from 'react';
import data from '../data.generated.json';
import Conferences from './Conferences';

export default function ConferencesPublic() {
  const [query, setQuery] = useState('');
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">학회 일정</h1>
        <p className="mt-2 text-sm text-ink-3 max-w-2xl">
          ASCO · ASH · AHA · JPM 등 biotech 주요 학회 일정과 발표 기업 매핑.
        </p>
        <div className="mt-4">
          <input
            type="search"
            placeholder="학회명 / 도시 / 영역 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md h-9 px-3 rounded-md bg-panel-2 border border-line text-sm text-ink placeholder:text-ink-4 focus:outline-none focus:border-line-2"
          />
        </div>
      </header>
      <Conferences data={data} query={query} onPick={null} />
    </div>
  );
}
