export type NumRange<
  Min extends number,
  Max extends number,
  Acc extends number[] = [],
> = Acc["length"] extends Max
  ? Acc[number]
  : NumRange<Min, Max, [...Acc, Acc["length"]]>;
