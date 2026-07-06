#!/usr/bin/env bash
# 배포에 필요한 정적 파일만 dist/ 로 모은다 (LICENSE, README, .git 등은 제외).
set -euo pipefail
cd "$(dirname "$0")"

rm -rf dist
mkdir -p dist

cp index.html dist/
cp -R css dist/
cp -R js dist/
cp -R res dist/

echo "dist/ 생성 완료:"
du -sh dist
