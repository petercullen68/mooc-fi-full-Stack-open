export const isFinitePositiveNumber = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v) && v > 0;

export const isFiniteNumberZeroOrPositive = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v) && v >= 0;

export const isFinitePositiveArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every(isFinitePositiveNumber);

export const isFiniteZeroOrPositiveArray = (
  value: unknown,
): value is number[] =>
  Array.isArray(value) && value.every(isFiniteNumberZeroOrPositive);

export const hasProp = (
  obj: unknown,
  prop: string,
): obj is Record<string, unknown> =>
  typeof obj === "object" &&
  obj !== null &&
  Object.prototype.hasOwnProperty.call(obj, prop);

type Query = Record<string, unknown>;

export const hasQueryParam = (query: Query, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(query, key);

export const getStringQueryParam = (query: Query, key: string): string | null => {
  const value = query[key];
  return typeof value === "string" ? value : null;
};