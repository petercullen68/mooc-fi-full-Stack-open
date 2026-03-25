export const calculateBmi = (height: number, weight: number) => {
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
