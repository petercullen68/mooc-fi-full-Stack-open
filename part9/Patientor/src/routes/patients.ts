import express, { Request, Response, NextFunction } from "express";
import patientsService from "../services/patientsService";
import { NewEntrySchema, NewPatientSchema } from "../utils";
import { Entry, NewPatient, PatientRouteParams, PatientSensitive } from "../types";

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

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};


router.get("/:id", (req: Request<PatientRouteParams>, res: Response) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});


router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<PatientRouteParams, unknown, Entry>, res: Response) => {
    const addedEntry = patientsService.addPatientEntry(req.params.id, req.body);
    if (addedEntry) {
      res.json(addedEntry);
    } else {
      res.status(404).send({ error: "Patient not found" });
    }
  },
);



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

export default router;
