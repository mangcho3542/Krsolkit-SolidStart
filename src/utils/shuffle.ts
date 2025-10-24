export function shuffle<T>(ary: T[]): T[] {
  ary.sort(() => Math.random() - 0.5);
  return ary;
}

/**
 * 플래튼 -> Fisher-Yates 섞기 -> 라운드로빈으로 재분배
 * 입력 배열은 변경하지 않음.
 */
export function shuffleMultiple<T>(ary: T[][]): T[][] {
  const outer = ary.length;
  if (outer === 0) return [];

  // 원래 각 서브배열 길이 보존
  const targetLens = ary.map((row) => row.length);
  const total = targetLens.reduce((s, n) => s + n, 0);
  if (total === 0) return targetLens.map(() => []);

  // 1) flatten (원본 보존)
  const flat: T[] = [];
  for (const row of ary) {
    for (const v of row) flat.push(v);
  }

  // 2) Fisher-Yates shuffle (in-place on flat)
  for (let i = flat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = flat[i];
    flat[i] = flat[j];
    flat[j] = tmp;
  }

  // 3) 라운드로빈으로 재분배하되, 이미 목표 길이에 도달한 행은 건너뜀
  const res: T[][] = targetLens.map(() => []);
  let r = 0;
  for (const v of flat) {
    // 다음으로 넣을 수 있는 행을 찾음 (최대 outer번 검사)
    let tried = 0;
    while (res[r].length >= targetLens[r] && tried < outer) {
      r = (r + 1) % outer;
      tried++;
    }
    if (tried >= outer) {
      // 모든 행이 가득 찼다면 더 이상 넣을 곳 없음 (정상적으로는 발생 안 함)
      break;
    }
    res[r].push(v);
    r = (r + 1) % outer;
  }

  return res;
}
