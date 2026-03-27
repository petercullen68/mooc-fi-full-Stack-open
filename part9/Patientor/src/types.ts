export enum Gender {  
    other = 'other', 
    male = 'male',
    female = 'female' 
  };


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
  gender: Gender;
  occupation: string;
}



export type PatientSensitive = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
