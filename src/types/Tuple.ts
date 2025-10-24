export type TupleType<
  T,
  Length extends number,
  R extends T[] = []
> = R["length"] extends Length ? R : TupleType<T, Length, [...R, T]>;
