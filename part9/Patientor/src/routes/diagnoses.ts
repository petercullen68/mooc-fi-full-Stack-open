import express, { Request, Response } from "express";
import diagnosesService from "../services/diagnosesService";
import { DiagnosisRouteParams } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnosesService.getDiagnosises());
});

router.get("/:code", (req: Request<DiagnosisRouteParams>, res: Response) => {
  const diagnosis = diagnosesService.getDiagnosis(req.params.code);
  if (diagnosis) {
    res.json(diagnosis);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

export default router;
