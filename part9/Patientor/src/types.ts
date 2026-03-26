export type gender = "other" | "male" | "female";


export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: gender;
  occupation: string;
}

export type PatientSensitive = Omit<Patient, "ssn">;
