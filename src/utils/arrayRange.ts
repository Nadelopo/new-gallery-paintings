export const arrayRange = (start: number, end: number) =>
  Array.from({ length: end - start }, (_, k) => k + start);
