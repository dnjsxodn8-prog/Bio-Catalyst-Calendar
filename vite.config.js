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
    include: ['react', 'react-dom', 'react-router-dom', '@clerk/clerk-react', 'lucide-react'],
    // plotly 는 스크리너 진입 전엔 불필요 → 사전 최적화에서 제외(첫 dev 요청 지연 감소).
    exclude: ['plotly.js-dist-min'],
  },
})
