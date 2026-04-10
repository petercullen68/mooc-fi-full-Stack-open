import patientsData from "../../data/patients";
import { Patient, PatientSensitive, NewPatient, Entry, NewEntry } from "../types";
import { randomUUID } from "crypto";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientsSensitive = (): PatientSensitive[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) return undefined;
  return patient;
};


const addPatient = (patient: NewPatient): PatientSensitive => {
  const newPatient = {
    id: randomUUID(),
    ...patient,
  };
  newPatient.entries = [];
  patientsData.push(newPatient);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn: _ssn, ...patientWithoutSsn } = newPatient;
  return patientWithoutSsn;
};

const addPatientEntry = (id : string, entry: NewEntry): Entry | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) return undefined;
  const newEntry = {
      id: randomUUID(),
      ...entry,
    };
  patient?.entries?.push(newEntry);
  return newEntry;
};


export default {
  getPatients,
  getPatientsSensitive,
  getPatient,
  addPatient,
  addPatientEntry
};
