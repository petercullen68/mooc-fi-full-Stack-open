export const isFinitePositiveNumber = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v) && v > 0;

export const isFiniteNumberZeroOrPositive = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v) && v >= 0;

export const isFinitePositiveArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every(isFinitePositiveNumber);

export const isFiniteZeroOrPositiveArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every(isFiniteNumberZeroOrPositive);

export const hasProp = (obj: unknown, prop: string): obj is Record<string, unknown> =>
  typeof obj === "object" &&
  obj !== null &&
  Object.prototype.hasOwnProperty.call(obj, prop);
