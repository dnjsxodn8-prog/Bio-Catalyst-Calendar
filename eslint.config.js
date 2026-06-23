import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'design/**', '.claude/worktrees/**', 'scripts/*.workflow.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  // Vercel 서버리스 함수 — Node 환경 (process 등).
  {
    files: ['api/**/*.js'],
    languageOptions: { globals: globals.node },
  },
  // 인프라/모듈 파일은 컴포넌트 외 export(상수·훅·provider)를 함께 내보냄 → fast-refresh 규칙 예외.
  {
    files: ['src/main.jsx', 'src/auth.jsx', 'src/store/**/*.{js,jsx}'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
