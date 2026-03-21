export const isNotNumber = (value: unknown): boolean => {
  return isNaN(Number(value));
};

export const isPositive = (value: number): boolean => {
  return value > 0;
};

export const isNonNegative = (value: number): boolean => {
  return value >= 0;
};
