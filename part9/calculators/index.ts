import type { Request, Response } from 'express';
import express from 'express';
import { calculateBmi } from "./bmiCalculator";

const app = express();


app.get("/bmi", (req: Request, res: Response) => {
  const { weight, height } = req.query;

  if (typeof weight !== "string" || typeof height !== "string") {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const weightNumber = Number(weight);
  const heightNumber = Number(height);

  if (Number.isNaN(weightNumber) || Number.isNaN(heightNumber)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(heightNumber, weightNumber);

  return res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi
  });
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});