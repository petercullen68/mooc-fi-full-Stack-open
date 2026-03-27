import { Gender } from "./types";
import { z } from "zod";

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: number;
}

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
});
