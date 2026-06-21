@echo off
REM 일요일 무인 준비 런처 (Windows 작업 스케줄러에서 호출).
REM %~dp0 = 이 .cmd 파일이 있는 scripts\ 폴더, .. = 프로젝트 루트.
REM 한글·공백 경로를 안전하게 흡수한다.
cd /d "%~dp0.."
node scripts\sunday-prep.mjs --days=10 >> "data\imports\sunday-prep.log" 2>&1
