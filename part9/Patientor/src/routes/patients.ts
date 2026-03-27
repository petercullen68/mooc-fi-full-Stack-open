import express, { Request, Response, NextFunction } from "express";
import patientsService from "../services/patientsService";
import { NewPatientSchema } from "../utils";
import { z } from "zod";
import { NewPatient, PatientSensitive } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatientsSensitive());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<PatientSensitive>,
  ) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  },
);

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
