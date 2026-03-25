import { isNotNumber, isNonNegative } from "./utils";

interface TargetAndDays {
  target: number;
  daysTraining: number[];
}

interface CalculatorResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseArguments = (args: string[]): TargetAndDays => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const checkArray: number[] = args.slice(2).map(Number);
  checkArray.forEach((value) => {
    if (isNotNumber(value) || !isNonNegative(value)) {
      throw new Error("Provided values included non numbers or negatives!");
    }
  });
  if (checkArray[0] === 0) {
    throw new Error("Target must be positive!");
  }
  return {
    target: checkArray[0],
    daysTraining: checkArray.slice(1).map(Number),
  };
};

export const exerciseCalculator = (
  target: number,
  daysTraining: number[],
): CalculatorResult => {
  const average =
    daysTraining.reduce((sum, day) => sum + day, 0) / daysTraining.length;
  let ratingDescription: string = "";
  let rating: number = 0;
  switch (true) {
    case average / target < 0.5:
      ratingDescription = "Do a lot better";
      rating = 1;
      break;
    case average / target < 1:
      ratingDescription = "A little better performance would be good";
      rating = 2;
      break;
    default:
      ratingDescription = "Perfect!";
      rating = 3;
      break;
  }

  return {
    periodLength: daysTraining.length,
    trainingDays: daysTraining.filter((day) => day > 0).length,
    success: average > target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};
