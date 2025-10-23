export function place(strs: string[], bools: boolean[][]): string[][] {
  const result: string[][] = [];
  const pool = strs.filter((s) => s !== "");
  let p = 0;

  for (let i = 0; i < bools.length; i++) {
    const row = bools[i];
    const outRow: string[] = [];
    for (let j = 0; j < row.length; j++) {
      outRow.push(row[j] ? pool[p++] ?? "" : "");
    }
    result.push(outRow);
  }

  return result;
}