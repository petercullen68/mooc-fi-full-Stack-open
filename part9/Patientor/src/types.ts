import z from "zod";
import { NewEntrySchema, NewPatientSchema } from "./utils";

export enum Gender {  
    other = 'other', 
    male = 'male',
    female = 'female' 
  };

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[]
}

export type PatientRouteParams = {
  id: string;
};

export type DiagnosisRouteParams = {
  code: string;
};


export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type PatientSensitive = Omit<Patient, "ssn" | "entries">;
export type NewPatient = z.infer<typeof NewPatientSchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;
