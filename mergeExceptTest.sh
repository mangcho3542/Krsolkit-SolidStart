set -e

# -------------------------------------------------------
# main 브랜치에서 dev의 변경을 merge하되
# test/ 디렉토리 전체와 mergeExceptTest.sh 파일은 제외하고 merge한다.
# -------------------------------------------------------

# 1. main인지 확인
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ]; then
  echo "main 브랜치에서만 실행 가능함 (현재: $current_branch)"
  exit 1
fi

# 2. 최신 상태 업데이트
git fetch origin

# 3. dev 브랜치 최신으로 가져오기
git checkout dev
git pull origin dev

# 4. 다시 main으로 돌아오기
git checkout main
git pull origin main

# 5. sparse-checkout 활성화
git sparse-checkout init --no-cone

# 6. 전체 포함하고 src/test만 제외
echo '/*' >> .git/info/sparse-checkout
echo '!src/routes/test/' >> .git/info/sparse-checkout

# 7. reapply
git sparse-checkout reapply

# 8. merge
git merge dev

# 9. push
git push

# 10. sparse-checkout disable
git sparse-checkout disable