import diagnosisData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnosises = (): Diagnosis[] => {
  return diagnosisData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnosises,
  addDiagnosis,
};
