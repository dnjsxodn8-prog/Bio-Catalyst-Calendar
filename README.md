# Bio Catalyst Calendar — Starter Kit

이 폴더는 노트북에서 Claude Code로 작업을 시작하기 위한 **최소 출발점**입니다.
여기 들어있는 파일들을 그대로 새 프로젝트 루트에 복사한 뒤,
Claude Code 세션을 시작하면 `CLAUDE.md`를 읽고 작업을 이어갑니다.

## 들어있는 것

```
CLAUDE.md                           ← 프로젝트 헌법. 매 세션 자동으로 읽힘
specs/
└── 001-data-layer.md               ← 데이터 모델 설계 문서
data/
└── companies/
    └── LLY.md                      ← 샘플 종목 파일 (스키마 예시)
```

## 시작 방법

1. 새 폴더 만들고 React + Vite 프로젝트 생성:
   ```
   npm create vite@latest biotech-catalyst -- --template react
   cd biotech-catalyst
   ```

2. 이 starter의 파일들을 그대로 복사:
   ```
   CLAUDE.md → biotech-catalyst/CLAUDE.md
   specs/    → biotech-catalyst/specs/
   data/     → biotech-catalyst/data/
   ```

3. 기존 App.jsx, data.js를 옮겨오기 (참조용으로):
   ```
   기존 App.jsx → biotech-catalyst/src/App.jsx
   기존 data.js → biotech-catalyst/legacy/data.js  (마이그레이션 후 삭제 예정)
   ```

4. Claude Code 시작:
   ```
   cd biotech-catalyst
   claude
   ```
   첫 메시지: "CLAUDE.md와 specs/001-data-layer.md를 읽고, 마이그레이션 스크립트부터 만들어줘."

## 다음 단계 (이 starter에는 없음, Claude Code가 만들 것)

- `scripts/migrate-from-legacy.mjs` — 기존 590줄 data.js를 마크다운으로 변환
- `scripts/build-data.mjs` — 마크다운 → JSON
- `scripts/verify-data.mjs` — 검증
- `.claude/skills/*` — 5개 스킬
- `specs/002-verification.md`, `003-prices.md`, `004-imports.md` — 후속 spec

## 왜 starter에 코드를 안 넣었나

`specs/`만 있으면 Claude Code가 그 spec을 보고 코드를 생성합니다.
사용자(나)가 spec을 먼저 읽고 "이 부분 바꾸자"고 조정하는 게
완성된 코드를 받아서 고치는 것보다 훨씬 빠르고 명확합니다.

이게 **spec-driven workflow**의 핵심입니다.
