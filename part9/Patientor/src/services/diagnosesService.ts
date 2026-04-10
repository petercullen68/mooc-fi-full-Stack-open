import diagnosisData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnosises = (): Diagnosis[] => {
  return diagnosisData;
};

const getDiagnosis = (code: string): Diagnosis | undefined => {
  const diagnosis = diagnosisData.find((p) => p.code === code);
  if (!diagnosis) return undefined;
  return diagnosis;
};

export default {
  getDiagnosises,
  getDiagnosis,
};
