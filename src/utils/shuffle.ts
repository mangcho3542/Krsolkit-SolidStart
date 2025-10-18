export function shuffle<T>(array: T[]): void {
  array.sort(() => Math.random() - 0.5);
}

export function shuffleMultiple<T>(ary: T[][]) {
  const colCount = ary[0].length;
  const indices = Array.from({ length: colCount }, (_, i) => i);

  for (let i = colCount - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // 각 행에 동일한 섞인 인덱스 적용
  return ary.map((row) => {
    return indices.map((idx) => row[idx]);
  });
}
