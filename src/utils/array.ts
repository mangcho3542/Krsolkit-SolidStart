type Length<T extends readonly any[]> = T["length"];
type RangeType<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : RangeType<N, [...Acc, Acc["length"]]>;

export function splitAry<
  T extends any[],
  Indices extends RangeType<Length<T>>[]
>(ary: [...T], indices: Indices) {
  let res: T[] = [];

  for (let i = 0; i < indices.length; i++) {
    let index = indices[i];
    res[i] = Number.isInteger(index) ? ary[index] : ary[Math.trunc(index)];
  }

  return res;
}
