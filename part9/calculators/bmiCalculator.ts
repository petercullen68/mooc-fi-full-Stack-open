import { isNotNumber, isPositive } from "./utils";

const calculateBmi = (height: number, weight: number) => {
  if (isNotNumber(height) || isNotNumber(weight) || !isPositive(height) || !isPositive(weight)) {
    throw new Error("Height and weight must be positive");
  }
  const heightInMeters: number = height / 100;
  const bmi: number = weight / (heightInMeters * heightInMeters);
  switch (true) {
    case bmi < 18.5:
      return "Underweight range";
    case bmi < 25:
      return "Normal range";
    case bmi < 30:
      return "Overweight range";
    default:
      return "Obesity range";
  }
};

try {
  const inputHeight: number = Number(process.argv[2]);
  const inputWeight: number = Number(process.argv[3]);
  console.log(
    `The BMI range for the entered height ${inputHeight} and weight ${inputWeight} is ${calculateBmi(inputHeight, inputWeight)}`,
  );
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
