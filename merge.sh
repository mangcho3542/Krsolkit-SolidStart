#!/usr/bin/env bash

set -e

MERGE_BRANCH="dev"

# main 브랜치인지 확인
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "❌ main 브랜치에서만 실행하세요. 지금은: $CURRENT_BRANCH"
  exit 1
fi

echo "🔀 dev → main merge (test 폴더 제외)"

# merge 시작 (커밋은 아직 안 함)
git merge "$MERGE_BRANCH" --no-commit --no-ff

# main에서 제외하고 싶은 경로들
EXCLUDE_PATHS=(
  "src/test"
  "src/routes/test"
)

for path in "${EXCLUDE_PATHS[@]}"; do
  if git ls-files --error-unmatch "$path" >/dev/null 2>&1; then
    echo "🚫 제외 처리: $path"
    git restore --staged "$path"
    git restore "$path"
  fi
done

# 커밋
git commit -m "dev브랜치 merge함."

echo "✅ merge 완료 (test 폴더는 main에 반영 안 됨)"
