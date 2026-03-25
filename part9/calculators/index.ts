import type { Request, Response } from 'express';
import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";
import {
  hasProp,
  isFinitePositiveNumber,
  isFiniteZeroOrPositiveArray,
} from "./utils";


const app = express();
app.use(express.json());


app.get("/bmi", (req: Request, res: Response) => {
  const { weight, height } = req.query;
  if (typeof weight !== "string" || typeof height !== "string") {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  if (isFinitePositiveNumber(weight) || isFinitePositiveNumber(height)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const weightNumber = Number(weight);
  const heightNumber = Number(height);


  const bmi = calculateBmi(heightNumber, weightNumber);

  return res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi
  });
});

app.post("/exercise", (req: Request, res: Response) => {
  if (!hasProp(req.body, "target")) {
    return res.status(400).json({ error: "target is missing" });
  }
  if (!hasProp(req.body, "daily_exercises")) {
    return res.status(400).json({ error: "daily_exercises is missing" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!isFinitePositiveNumber(target)) {
    return res.status(400).json({ error: "target must be number" });
  }
  if (!isFiniteZeroOrPositiveArray(daily_exercises)) {
    return res
      .status(400)
      .json({ error: "daily_exercises must be an array of numbers 0 or positive" });
  }
  return res.json(exerciseCalculator(target, daily_exercises));
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});