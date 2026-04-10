import type { Request, Response } from "express";
import express from "express";
import patientsRouter from "./routes/patients";
import diagnosisRouter from "./routes/diagnoses";
import { errorMiddleware } from "./middleware/errorMiddleware";

// Setup
const app = express();
app.use(express.json());

// Sanity test API is up
app.get("/api/ping", (_req: Request, res: Response) => {
  res.send("pong");
});


// Routes
app.use('/api/patients', patientsRouter);
app.use("/api/diagnosis", diagnosisRouter);
app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
