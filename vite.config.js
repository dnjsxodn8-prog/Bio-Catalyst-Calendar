import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import path from 'node:path'

// spec 019 — dev 미들웨어: 로컬에서 `/api/private-data` 를 디스크에서 읽어 반환.
// 로컬은 무인증(개발 편의). production 은 api/private-data.js 서버리스가 Clerk 검증.
// 이렇게 두면 클라이언트는 dev/prod 모두 `fetch('/api/private-data')` 한 경로만 사용 →
// 비공개 JSON 이 정적 클라이언트 번들에 절대 포함되지 않는다.
function devPrivateDataApi() {
  return {
    name: 'dev-private-data-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/private-data', (req, res) => {
        const root = server.config.root
        const read = (rel, fb) => {
          try {
            return JSON.parse(readFileSync(path.join(root, rel), 'utf8'))
          } catch {
            return fb
          }
        }
        const body = JSON.stringify({
          data: read('src/data.generated.json', {
            companies: [], catalysts: [], conferences: [], feed: [], prices: {},
          }),
          screener: read('src/screener.generated.json', { points: [], counts: {}, coverage: {} }),
          valuation: read('src/valuation.generated.json', { markets: { us: { rows: [] }, kr: { rows: [] } } }),
        })
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store')
        res.end(body)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devPrivateDataApi()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          // Plotly 는 스크리너 라우트에서만 lazy 로드 → 별도 chunk 로 격리(공개 경로 미로드).
          if (id.includes('plotly')) return 'plotly'
          if (id.includes('@clerk')) return 'clerk'
          if (id.includes('react-router')) return 'router'
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) return 'react-vendor'
          return 'vendor'
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
  optimizeDeps: {
    // dev cold-start 시 optimizer hang 완화 — 무거운/공통 의존성을 미리 번들.
    // plotly(UMD)는 스크리너 차트(lazy 컴포넌트 내 동적 import)에서만 쓰이는데,
    // 스캐너가 lazy chunk 의 동적 import 를 못 잡아 사전번들에서 누락 → 첫 진입 시
    // on-demand 최적화 중 빈 모듈이 반환되어 차트가 로드되지 않았다(spec 020).
    // 명시적으로 include 해 서버 시작 시 한 번 사전번들한다(dev 전용, prod 빌드 무관).
    include: ['react', 'react-dom', 'react-router-dom', '@clerk/clerk-react', 'lucide-react', 'plotly.js-dist-min'],
  },
})
